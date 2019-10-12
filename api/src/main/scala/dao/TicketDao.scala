package dao

import java.util.UUID

import models.{Ticket, TicketSchema}
import sql.SqlDatabase

import scala.concurrent.{ExecutionContext, Future}

class TicketDao(protected val database: SqlDatabase)(implicit val ec: ExecutionContext) extends TicketSchema {

  import database._
  import database.driver.api._

  def addTicket(ticket: Ticket): Future[Ticket] = {
    db.run(tickets += ticket).map(_ => ticket)
  }

  def listTickets(): Future[Seq[Ticket]] = {
    db.run(tickets.result)
  }

  def getTicketById(id: UUID): Future[Option[Ticket]] = {
    db.run(tickets.filter(_.id === id).result).map(_.headOption)
  }

  def updateTicket(id: UUID, status: String) = {
    db.run(tickets.filter(_.id === id).map(_.status).update(status))
  }



}
