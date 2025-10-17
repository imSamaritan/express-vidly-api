const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  return res.render("index", {
    title: "app-express",
    message: "Welcome to the home page",
  })
})

module.exports = router
