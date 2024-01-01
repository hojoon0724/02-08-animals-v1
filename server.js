// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
require("dotenv").config();
require("./config/db.js");

// -----------------------------------------------------
// Application Object
// -----------------------------------------------------
const app = express();
const { PORT = 3013 } = process.env;
const Animal = require("./models/animalsConstructor.js");

// -----------------------------------------------------
// Middleware
// -----------------------------------------------------
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));

// -----------------------------------------------------
// Routes INDUCESS
// -----------------------------------------------------
// Index
app.get("/index", async (req, res) => {
  let allAnimals = await Animal.find({});
  res.send(allAnimals);
});

// New
app.get("/index/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
app.delete("/index/:id", async (req, res) => {
  let deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
  res.send("deleted");
  // res.redirect("/index"); // redirecting after first res doesn't work
});

// Update
app.put("/index/:id", async (req, res) => {
  const id = req.params.id;
  const editedAnimal = req.body;
  let updatedAnimalData = await Animal.findByIdAndUpdate(id, editedAnimal, { new: true });
  res.send(updatedAnimalData);
});

// Create
app.post("/index", async (req, res) => {
  let animalEntry = await Animal.create(req.body);
  res.send(animalEntry);
});

// Edit
app.get("/index/:id/edit", async (req, res) => {
  let foundAnimal = await Animal.findById(req.params.id);
  res.render("edit.ejs", { foundAnimal });
});

// Seed

// Show
app.get("/index/:id", async (req, res) => {
  let animalToShow = await Animal.findById(req.params.id);
  res.send(animalToShow);
});

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.send(`root response`);
});

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
