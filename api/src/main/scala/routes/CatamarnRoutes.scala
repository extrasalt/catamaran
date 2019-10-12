package routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes
import service.{CatamaranService, TicketDuplicateFound, TicketInsertSuccess}
import akka.http.scaladsl.server.Directives.{complete, _}
import spray.json._

import scala.concurrent.ExecutionContext


case class TicketInput(issueType: String, message: String, address: String, phoneNo: String)

trait TicketFormats extends DefaultJsonProtocol {
  implicit val ticketInputFormat = jsonFormat4(TicketInput.apply)
}

trait CatamarnRoutes extends TicketFormats with SprayJsonSupport {
  implicit val ec: ExecutionContext

  def catamaranService: CatamaranService

  def catamaranRoutes = path("issue") {
    post {
      entity(as[TicketInput]) { ticketInput =>
        onSuccess(catamaranService.createTicket(ticketInput)) {
          case TicketDuplicateFound(msg) => complete((StatusCodes.Conflict, msg))
          case TicketInsertSuccess(msg) => complete((StatusCodes.OK, msg))
        }
      }
    }
  }

}
