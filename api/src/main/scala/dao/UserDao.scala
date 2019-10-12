package dao

import models.{User, UserSchema}
import sql.SqlDatabase

case class UserDao(database: SqlDatabase) extends UserSchema {
  import database.driver.api._

  def addUser(user: User) = {
    database.db.run(users += user)
  }
}