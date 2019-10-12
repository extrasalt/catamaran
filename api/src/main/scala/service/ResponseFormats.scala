package service

import java.util.UUID

import models.Volunteer
import spray.json.{DefaultJsonProtocol, JsString, JsValue, RootJsonFormat, deserializationError}

case class VolunteerInfo(firstName: String, lastName: String, gender: String, email: String, password: String, phoneNo: String)
case class TicketInput(issueType: String, message: String, address: String, phoneNo: String)

trait ResponseFormats extends DefaultJsonProtocol {

  implicit object UuidJsonFormat extends RootJsonFormat[UUID] {
    def write(x: UUID) = JsString(x.toString)
    def read(value: JsValue): UUID = value match {
      case JsString(x) => UUID.fromString(x)
      case x           => deserializationError("Expected UUID as JsString, but got " + x)
    }
  }

  implicit val volunteerInfoJsonFormat = jsonFormat6(VolunteerInfo.apply)
  implicit val volunteerJsonFormat = jsonFormat6(Volunteer.apply)
  implicit val ticketInputFormat = jsonFormat4(TicketInput.apply)
}