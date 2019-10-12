package service

import java.util.UUID

import dao.{AssignedTicketDao, TicketDao, UserDao, VolunteerDao}
import models.{AssignedTicket, Ticket, User, Volunteer}

import scala.concurrent.{ExecutionContext, Future}

class CatamaranService(ticketDao: TicketDao, userDao: UserDao, volunteerDao: VolunteerDao,
                       assignedTicketDao: AssignedTicketDao)(implicit val ec: ExecutionContext) {

  def createTicket(ticketInput: TicketInput): Future[TicketInsertResult] = {
    findIfDuplicateTicketExists(ticketInput).flatMap {
      case Some(t) => Future(
        TicketDuplicateFound(s"Could not insert ticket because a duplicate ticket(#${t.id}) has already been created.")
      )
      case None => ticketDao.addTicket(Ticket.fromTicketInput(ticketInput, "Open"))
        .map(t => TicketInsertSuccess(s"Ticket ${t.id} was successfully created"))
    }
  }

  def findIfDuplicateTicketExists(ticketInput: TicketInput): Future[Option[Ticket]] = {
    ticketDao.listTickets().map {
      case tickets => tickets.find {
        ticket => ticket.message == ticketInput.message && ticket.address == ticketInput.address
      }
    }
  }

  def getTicket(id: String): Future[TicketFetchResult] = {
    try {
      ticketDao.getTicketById(UUID.fromString(id)).map {
        case None => TicketNotFound(s"Unable to find ticket with id $id")
        case Some(ticket) => TicketFound(ticket)
      }
    } catch {
      case ex: Exception => Future(TicketFetchError(ex.getMessage))
    }

  }

  def validateUser(userInfo: UserInfo) = {
    for {
      volunteerId <- userDao.fetchUser(userInfo)
      volunteer <- if (volunteerId.isDefined) volunteerDao.findVolunteer(volunteerId.get) else Future.successful(None)
    } yield volunteer
  }

  def listTickets() = {
    ticketDao.listTickets()
  }

  def updateTicket(ticketPatch: TicketPatch): Future[TicketUpdateResult] = {
    getTicket(ticketPatch.id).flatMap {
      case TicketFound(ticket) => ticketPatch.volunteer match {
        case Some(v) => updateVolunteerInfo(ticket, v)
        case None => ticketDao.updateTicket(ticket.id, ticketPatch.status).map(_ => TicketUpdateSuccess)
      }
    }
  }

  def updateVolunteerInfo(ticket: Ticket, volunteerInfo: VolunteerInfo): Future[TicketUpdateResult] = {
    getVolunteer(volunteerInfo).flatMap {
      case None => Future(VolunteerNotFound(s"No volunteer found with name ${volunteerInfo.firstName} ${volunteerInfo.lastName}"))
      case Some(v) => for {
        _ <- ticketDao.updateTicket(ticket.id, ticket.status)
        _ <- assignedTicketDao.addUser(AssignedTicket(ticket.id, v.id))
      } yield TicketUpdateSuccess
    }
  }

  def getVolunteer(volunteerInfo: VolunteerInfo): Future[Option[Volunteer]] = {
    volunteerDao
      .findVolunteerBy(volunteerInfo.firstName, volunteerInfo.lastName, volunteerInfo.email, volunteerInfo.gender,
        volunteerInfo.phoneNo)
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


sealed trait TicketFetchResult

case class TicketNotFound(msg: String) extends TicketFetchResult

case class TicketFound(ticket: Ticket) extends TicketFetchResult

case class TicketFetchError(msg: String) extends TicketFetchResult


sealed trait TicketUpdateResult

case class VolunteerNotFound(msg: String) extends TicketUpdateResult

case object TicketUpdateSuccess extends TicketUpdateResult