const express = require("express")
const Joi = require("joi")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

let genres = [
  { id: 1, name: "Scientific Action" },
  { id: 2, name: "Action" },
  { id: 3, name: "Horror" },
]

app.get("/", (req, res) => {
  return res.redirect("/api/genres")
})

app.get("/api/genres", (req, res) => {
  if (genres.length < 1)
    return res.send("No genres to show, create new genres!")

  return res.send(genres)
})

app.get("/api/genres/:id", (req, res) => {
  //Look for genres using ID
  const id = parseInt(req.params.id)
  const genre = genres.find((genre) => genre.id === id)

  if (!genre)
    return res.status(404).send("Can not found a genre with given ID!")

  return res.status(200).send(genre)
})

app.post("/api/genres", (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres.push(genre)
  return res.send(genre)
})

app.put("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const genre = genres.find((genre) => genre.id === id)

  if (!genre) return res.status(404).send("Genre to update, not found!")

  const { error } = validate(req.body)
  if (error) return res.send(error.details[0].message)

  genre.name = req.body.name
  return res.send(genre)
})

app.delete("/api/genres/:id", (req, res) => {
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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
