package service

import akka.http.scaladsl.marshalling.{Marshal, Marshaller}
import akka.http.scaladsl.model._
import akka.stream.Materializer
import spray.json._
import utils.{HttpClient, Response}

import scala.concurrent.ExecutionContext
import scala.concurrent.duration.FiniteDuration

case class Error(message: String)
trait ErrorJsonFormats extends DefaultJsonProtocol {
  implicit val errorFormat = jsonFormat1(Error.apply)
}
object ErrorJsonFormats extends ErrorJsonFormats

trait Requests {
  implicit val mat: Materializer
  implicit val ec: ExecutionContext

  def httpClient: HttpClient
  def baseUri: String
  def timeout: FiniteDuration
  def authorization: Option[HttpHeader]

  protected def get(path: String) = {
    val request = HttpRequest(
      method = HttpMethods.GET,
      uri = Uri(s"$baseUri/$path")
    ).withHeaders(headers())
    httpClient
      .makeRequest(request)
      .flatMap(response => asJson(request, response))
  }

  protected def post[T](path: String, payload: T, customHeaders: List[HttpHeader] = Nil)(
    implicit m: Marshaller[T, RequestEntity]
  ) = {
    Marshal(payload)
      .to[RequestEntity]
      .flatMap { entity =>
        val request = HttpRequest(
          method = HttpMethods.POST,
          uri = Uri(s"$baseUri/$path"),
          entity = entity
        ).withHeaders(headers(customHeaders))
        httpClient
          .makeRequest(request)
          .flatMap(response => asJson(request, response))
      }
  }

  protected def put[T](path: String, payload: T)(implicit m: Marshaller[T, RequestEntity]) = {
    Marshal(payload)
      .to[RequestEntity]
      .flatMap { entity =>
        val request = HttpRequest(
          method = HttpMethods.PUT,
          uri = Uri(s"$baseUri/$path"),
          entity = entity
        ).withHeaders(headers())
        httpClient
          .makeRequest(request)
          .flatMap(response => asJson(request, response))
      }
  }

  protected def delete[T](path: String)(implicit m: Marshaller[T, RequestEntity]) = {
    val request = HttpRequest(
      method = HttpMethods.DELETE,
      uri = Uri(s"$baseUri/$path")
    ).withHeaders(headers())
    httpClient
      .makeRequest(request)
      .map(_.httpResponse)
  }

  protected def patchReq[T](path: String, payload: T)(implicit m: Marshaller[T, RequestEntity]) = {
    Marshal(payload)
      .to[RequestEntity]
      .map { entity =>
        HttpRequest(
          method = HttpMethods.PATCH,
          uri = Uri(s"$baseUri/$path"),
          entity = entity
        ).withHeaders(headers())
      }
  }
  protected def patch[T](path: String, payload: T)(implicit m: Marshaller[T, RequestEntity]) = {
    patchReq(path, payload).flatMap { request =>
      httpClient
        .makeRequest(request)
        .map(_.httpResponse)
    }
  }

  protected def asJson(request: HttpRequest, response: Response) = {
    val httpResponse = response.httpResponse
    httpResponse.status match {
      case status if status.isSuccess() =>
        httpResponse.entity
          .toStrict(timeout)
          .map { entity =>
            val responseJsonAsString = entity.data.utf8String
            println(responseJsonAsString)
            responseJsonAsString.parseJson
          }
      case _ =>
        httpResponse.entity
          .toStrict(timeout)
          .map { entity =>
            try {
              import ErrorJsonFormats._
              val error = entity.data.utf8String.parseJson.convertTo[Error]
              throw new RuntimeException(s"Request Failed with Code: ${httpResponse.status}, Message: ${error.message}")
            } catch {
              case _ => throw new RuntimeException(s"Request $request failed with code: ${httpResponse.status}")
            }
          }
    }
  }

  protected def headers(customerHeaders: List[HttpHeader] = Nil) =
    List[Option[HttpHeader]](authorization).flatten ++ customerHeaders
}
