package models

import java.sql.Timestamp
import java.util.UUID

import slick.lifted
import sql.SqlDatabase

case class Ticket(id: UUID, issueType: String, message: String, status: String, address: String, phoneNo: String,
                  createdDate: Timestamp, dispatchedDate: Timestamp, resolvedDate: Timestamp)


trait TicketSchema {
  protected val database: SqlDatabase

  import database.driver.api._

  val tickets = lifted.TableQuery[Tickets]

  protected class Tickets(tag: Tag) extends Table[Ticket](tag, "tickets") {
    def id = column[UUID]("id", O.PrimaryKey)

    def issueType = column[String]("issue_type")

    def message = column[String]("message")

    def status = column[String]("status")

    def address = column[String]("address")

    def phoneNo = column[String]("phone_number")

    def createdDate = column[Timestamp]("created_timestamp")

    def dispatchedDate = column[Timestamp]("dispatched_timestamp")

    def resolvedDate = column[Timestamp]("resolved_timestamp")

    def * = (id, issueType, message, status, address, phoneNo, createdDate, dispatchedDate, resolvedDate) <>
      ((Ticket.apply _).tupled, Ticket.unapply)
  }
}