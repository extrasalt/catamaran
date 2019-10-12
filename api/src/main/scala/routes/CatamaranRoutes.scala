package routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{complete, _}
import service._

import scala.concurrent.ExecutionContext

trait CatamaranRoutes extends  SprayJsonSupport with ResponseFormats {
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
  } ~ path("volunteer") {
    post {
      entity(as[VolunteerInfo]) { volunteerInfo =>
        complete(catamaranService.registerUser(volunteerInfo))
      }
    }
  } ~ path("show" / Segment) { issueId =>
    post {
      onSuccess(catamaranService.getTicket(issueId)) {
        case TicketNotFound(msg) => complete((StatusCodes.NotFound, msg))
        case TicketFound(ticket) => complete((StatusCodes.Found, ticket))
        case TicketFetchError(msg) => complete((StatusCodes.BadRequest, msg))
      }

    }

  }

}
