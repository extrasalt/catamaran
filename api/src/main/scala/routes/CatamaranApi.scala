package routes

import com.twitter.scalding.Args
import com.typesafe.scalalogging.StrictLogging

object CatamaranApi extends App with StrictLogging {
  val cmdArgs = Args(args)
  val host = cmdArgs.optional("host").getOrElse("localhost")
  val port = cmdArgs.optional("port").map(_.toInt).getOrElse(4000)

  val service = new ServiceRouter()
  logger.info(s"Starting server on $host:$port")
  service.bind(host, port)
}
