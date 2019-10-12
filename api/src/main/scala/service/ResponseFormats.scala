package service

import models.{Ticket, Volunteer}
import spray.json.DefaultJsonProtocol
import utils.JsonSupport

case class VolunteerInfo(firstName: String, lastName: String, gender: String, email: String, password: String, phoneNo: String)
case class TicketInput(issueType: String, message: String, address: String, phoneNo: String)
case class UserInfo(email: String, password: String)

trait ResponseFormats extends DefaultJsonProtocol with JsonSupport {

  implicit val volunteerInfoJsonFormat = jsonFormat6(VolunteerInfo.apply)
  implicit val volunteerJsonFormat = jsonFormat6(Volunteer.apply)
  implicit val ticketInputFormat = jsonFormat4(TicketInput.apply)
  implicit val ticketFormat = jsonFormat9(Ticket.apply)
  implicit val userInfoJsonFormat = jsonFormat2(UserInfo.apply)
}