package service

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.FormData
import akka.http.scaladsl.model.headers.RawHeader
import spray.json._

case class TwilioRequest(from: String, to: String, body: String)
trait TwilioJsonFormat extends DefaultJsonProtocol {
  implicit val twilioJsonFormat = jsonFormat3(TwilioRequest.apply)
}
object TwilioJsonFormat extends TwilioJsonFormat

trait TwilioRequests extends Requests with SprayJsonSupport {
  import TwilioJsonFormat._

  private def constructRequestString(request: TwilioRequest) =
    FormData("From" -> "whatsapp:+14155238886", "To" -> request.to, "Body" -> request.body)

  def sendMessage(request: TwilioRequest) = {
    post("Messages.json",
      constructRequestString(request)
    )
  }
}
