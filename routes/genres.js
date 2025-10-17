const Joi = require("joi")
const express = require("express")

const router = express.Router()

let genres = [
  { id: 1, name: "Scientific Action" },
  { id: 2, name: "Action Comedy" },
  { id: 3, name: "Horror" },
]

router.get("/", (req, res) => {
  if (genres.length < 1)
    return res.send("No genres to show, create new genres!")

  return res.send(genres)
})

router.get("/:id", (req, res) => {
  //Look for genres using ID
  const id = parseInt(req.params.id)
  const genre = genres.find((genre) => genre.id === id)

  if (!genre)
    return res.status(404).send("Can not found a genre with given ID!")

  return res.status(200).send(genre)
})

router.post("/", (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres.push(genre)
  return res.send(genre)
})

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const genre = genres.find((genre) => genre.id === id)

  if (!genre) return res.status(404).send("Genre to update, not found!")

  const { error } = validate(req.body)
  if (error) return res.send(error.details[0].message)

  genre.name = req.body.name
  return res.send(genre)
})

router.delete("/:id", (req, res) => {
  //Look up for genre
  const id = parseInt(req.params.id)
  const genre = genres.find((genre) => genre.id === id)

  //If genre does not exists
  if (!genre) return res.status(404).send("Genre to remove, not found!")

  //If genre exists
  genres = genres.filter((genre) => genre.id != id)
  return res.send(genre)
})

function validate(data) {
  const schema = {
    name: Joi.string().min(5).required(),
  }

  return Joi.validate(data, schema)
}

module.exports = router
