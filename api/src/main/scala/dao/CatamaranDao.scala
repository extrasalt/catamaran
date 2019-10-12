package dao

import models.{Ticket, TicketSchema}
import sql.SqlDatabase

import scala.concurrent.{ExecutionContext, Future}

class CatamaranDao(protected val database: SqlDatabase)(implicit val ec: ExecutionContext) extends TicketSchema {

  import database._
  import database.driver.api._

  def addTicket(ticket: Ticket) = {
    db.run(tickets += ticket).map(_ => ticket)
  }

  def listTickets(): Future[Seq[Ticket]] = {
    db.run(tickets.result)
  }



}
