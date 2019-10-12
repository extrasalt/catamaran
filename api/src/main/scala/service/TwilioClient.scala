package service

import akka.http.scaladsl.model.HttpHeader
import akka.http.scaladsl.model.headers.{Authorization, BasicHttpCredentials}
import akka.stream.Materializer
import com.typesafe.config.Config
import utils.HttpClient

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

case class TwilioClient(config: Config, httpClient: HttpClient)(implicit val ec: ExecutionContext, val mat: Materializer) extends TwilioRequests {

  override def authorization: Option[HttpHeader] = Option(Authorization(BasicHttpCredentials(config.getString("twilio.sid"), config.getString("twilio.authToken"))))

  override def baseUri: String = "https://api.twilio.com/2010-04-01/Accounts/ACa7c6316c3c162efdd614e685969ca6ab"

  override def timeout: FiniteDuration = 120 seconds

}
