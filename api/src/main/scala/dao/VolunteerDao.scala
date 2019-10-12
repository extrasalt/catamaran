package dao

import java.util.UUID

import models.{Volunteer, VolunteerSchema}
import sql.SqlDatabase

import scala.concurrent.{ExecutionContext, Future}

case class VolunteerDao(database: SqlDatabase)(implicit ec: ExecutionContext) extends VolunteerSchema {
  import database.driver.api._

  def addVolunteer(volunteer: Volunteer) = {
    database.db.run(volunteers += volunteer)
  }

  def findVolunteer(id: UUID): Future[Option[Volunteer]] = {
    val query = volunteers.filter(_.id === id)
    database.db.run(query.result).map(_.headOption)
  }
}

