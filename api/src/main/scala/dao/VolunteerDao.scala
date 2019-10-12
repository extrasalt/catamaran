package dao

import models.{Volunteer, VolunteerSchema}
import sql.SqlDatabase

case class VolunteerDao(database: SqlDatabase) extends VolunteerSchema {
  import database.driver.api._

  def addVolunteer(volunteer: Volunteer) = {
    database.db.run(volunteers += volunteer)
  }
}

