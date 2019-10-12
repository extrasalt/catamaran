

scalaVersion := "2.12.8"
version := "0.1.0-SNAPSHOT"

resolvers ++= Seq(
  "Millhouse Bintray" at "http://dl.bintray.com/themillhousegroup/maven"
)

val akkaHttpVersion = "10.1.7"
val akkaVersion = "2.5.19"
val akkaStack = Seq(
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-actor" % akkaVersion,
  "com.typesafe.akka" %% "akka-stream" % akkaVersion
)

val scaldingArgs = "com.twitter" %% "scalding-args" % "0.17.4"
val logbackVersion = "1.1.7"
val logbackCore    = "ch.qos.logback" % "logback-core" % logbackVersion
val logbackClassic = "ch.qos.logback" % "logback-classic" % logbackVersion
val scalaLogging   = "com.typesafe.scala-logging" %% "scala-logging" % "3.9.2"
val logging        = Seq(logbackCore, logbackClassic, scalaLogging)

val slickVersion = "3.2.0"
val slick = "com.typesafe.slick" %% "slick" % slickVersion
val slickHikari = "com.typesafe.slick" %% "slick-hikaricp" % slickVersion
val postgres = "org.postgresql" % "postgresql" % "9.4.1212"
val flyway = "org.flywaydb" % "flyway-core" % "4.1.1"
val slickStack = Seq(slick, postgres, slickHikari, flyway)


val rootDependencies = Seq(scaldingArgs) ++ akkaStack ++ slickStack ++ logging

libraryDependencies ++= rootDependencies