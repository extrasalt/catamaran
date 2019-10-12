package models

import java.util.UUID

import slick.lifted
import sql.SqlDatabase

case class Volunteer(id: UUID, name: String, email: String, phoneNo: String)


trait VolunteerSchema {
  protected val database: SqlDatabase

  import database.driver.api._

  val volunteers = lifted.TableQuery[Volunteers]

  protected class Volunteers(tag: Tag) extends Table[Volunteer](tag, "volunteers") {
    def id = column[UUID]("id", O.PrimaryKey)

    def name = column[String]("name")

    def email = column[String]("email")

    def phoneNo = column[String]("phone_number")

    def * = (id, name, email, phoneNo) <>
      ((Volunteer.apply _).tupled, Volunteer.unapply)
  }
}