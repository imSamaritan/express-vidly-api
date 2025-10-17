const mailDebugger = require("debug")("app:mail")
const config = require("config")
const helmet = require("helmet")
const morgan = require("morgan")
const logger = require("./middleware/logger")
const homeRouter = require("./routes/home")
const genresRouter = require("./routes/genres")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("assets"))

//Set template engine
app.set("view engine", "ejs")
app.set("views", "pages")

//Third part middleware
app.use(helmet())
const environment = app.get("env")

if (environment === "development") {
  app.use(morgan("dev"))
  //Custom middleware
  app.use(logger)
}

//mail details
mailDebugger("app name: " + config.get("app_name"))
mailDebugger("mail host: " + config.get("mail.host"))
mailDebugger("port: " + config.get("mail.port"))
mailDebugger("password: " + config.get("mail.password"))

app.use("/", homeRouter)
app.use("/api/genres", genresRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
