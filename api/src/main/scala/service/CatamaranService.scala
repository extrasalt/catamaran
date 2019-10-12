package service

import dao.{CatamaranDao, UserDao, VolunteerDao}
import models.{Ticket, User, Volunteer}
import java.util.UUID

import dao.CatamaranDao
import models.Ticket

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

  def findIfDuplicateTicketExists(ticketInput: TicketInput): Future[Option[Ticket]] = {
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

  def getTicket(id: String): Future[TicketFetchResult] = {
    try {
      catamaranDao.getTicketById(UUID.fromString(id)).map {
        case None => TicketNotFound(s"Unable to find ticket with id $id")
        case Some(ticket) => TicketFound(ticket)
      }
    } catch {
      case ex: Exception => Future(TicketFetchError(ex.getMessage))
    }

  }

}


sealed trait TicketInsertResult

case class TicketDuplicateFound(msg: String) extends TicketInsertResult

case class TicketInsertSuccess(msg: String) extends TicketInsertResult


sealed trait TicketFetchResult

case class TicketNotFound(msg: String) extends TicketFetchResult

case class TicketFound(ticket: Ticket) extends TicketFetchResult
case class TicketFetchError(msg: String) extends TicketFetchResult