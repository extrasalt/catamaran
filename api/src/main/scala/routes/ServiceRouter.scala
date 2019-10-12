package routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer

class ServiceRouter extends HealthRoute  {
  implicit val system = ActorSystem("catamaran-api")
  implicit val executor = system.dispatcher
  implicit val materializer = ActorMaterializer()

  val routes = health

  def bind(host: String, port: Int) = {
    Http().bindAndHandle(Route.handlerFlow(routes), host, port)
  }
}
