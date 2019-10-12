package routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer

class ServiceRouter(catamarnRoutes: Route) extends HealthRoute  {
  implicit val system = ActorSystem("catamaran-api")
  implicit val executor = system.dispatcher
  implicit val materializer = ActorMaterializer()

  val routes = health ~ catamarnRoutes

  def bind(host: String, port: Int) = {
    Http().bindAndHandle(Route.handlerFlow(routes), host, port)
  }
}
