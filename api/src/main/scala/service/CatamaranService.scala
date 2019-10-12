package service

import dao.{CatamaranDao, UserDao, VolunteerDao}
import models.{Ticket, User, Volunteer}

import scala.concurrent.{ExecutionContext, Future}

class CatamaranService(catamaranDao: CatamaranDao, userDao: UserDao, volunteerDao: VolunteerDao)(implicit val ec: ExecutionContext) {

  def createTicket(ticketInput: TicketInput): Future[TicketInsertResult] = {
    findIfDuplicateTicketExists(ticketInput).flatMap {
      case Some(t) => Future(
        TicketDuplicateFound(s"Could not insert ticket because a duplicate ticket(#${t.id}) has already been created.")
      )
      case None => catamaranDao.addTicket(Ticket.fromTicketInput(ticketInput, "Open"))
        .map(t => TicketInsertSuccess(s"Ticket ${t.id} was successfully created"))
    }
  }

  def findIfDuplicateTicketExists(ticketInput: TicketInput) = {
    catamaranDao.listTickets().map {
      case tickets => tickets.find {
        ticket => ticket.message == ticketInput.message && ticket.address == ticketInput.address
      }
    }
  }

  def registerUser(volunteerInfo: VolunteerInfo) = {
    val newVolunteer = Volunteer(volunteerInfo)
    for {
      volunteer <- volunteerDao.addVolunteer(newVolunteer).map(_ => newVolunteer)
      userDetails <- userDao.addUser(User(volunteer.id, volunteer.email, volunteerInfo.password)).map(_ => newVolunteer)
    } yield userDetails
  }
}


sealed trait TicketInsertResult

case class TicketDuplicateFound(msg: String) extends TicketInsertResult

case class TicketInsertSuccess(msg: String) extends TicketInsertResult