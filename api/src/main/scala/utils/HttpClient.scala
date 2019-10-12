package utils

import java.net.InetSocketAddress

import akka.actor.ActorSystem
import akka.http.scaladsl.{ClientTransport, Http}
import akka.http.scaladsl.model.{HttpRequest, HttpResponse, StatusCodes}
import akka.http.scaladsl.model.headers.{BasicHttpCredentials, HttpCredentials}
import akka.http.scaladsl.settings.{ClientConnectionSettings, ConnectionPoolSettings}
import akka.stream.Materializer
import com.typesafe.scalalogging.StrictLogging
import spray.json._

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration._

case class Response(httpResponse: HttpResponse, timeTaken: Duration) {
  def convertTo[T](timeout: FiniteDuration)(implicit jsonReader: JsonReader[T],
                                            ec: ExecutionContext,
                                            mat: Materializer): Future[T] = {

    val toJsValue =
      httpResponse.entity
        .toStrict(timeout)
        .map { entity =>
          entity.data.utf8String.parseJson
        }

    httpResponse.status match {
      case StatusCodes.OK => toJsValue.map(_.convertTo[T])
      case code =>
        Future
          .failed(new RuntimeException(s"Invalid status code : $code, time taken: $timeTaken"))
    }

  }

}

object Response {
  def apply(httpResponse: HttpResponse): Response = Response(httpResponse, Duration.Undefined)
}

trait HttpClient {
  def makeRequest(request: HttpRequest): Future[Response]
}

case class AkkaHttpClient()(implicit actorSystem: ActorSystem, mat: Materializer)
  extends HttpClient
    with StrictLogging {
  private val http = Http()

  override def makeRequest(request: HttpRequest): Future[Response] = {
    logger.info(s"Requesting : ${request.method.value} ${request.uri}")

    lazy val clientConnectionSettings = ClientConnectionSettings(actorSystem)

    val connectionSettings = ConnectionPoolSettings(actorSystem)

    import mat._
    val requestStartedAt = System.nanoTime()
    http
      .singleRequest(request)
      .map(httpResponse => Response(httpResponse, timeTaken = Duration.fromNanos(System.nanoTime() - requestStartedAt)))
  }

  def shutdown(): Future[Unit] = {
    http.shutdownAllConnectionPools()
  }
}
