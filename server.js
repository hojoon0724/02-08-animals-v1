// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
require("dotenv").config();
require("./config/db.js");
const seedData = require("./models/seed.js");

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
app.use((req, res, next) => {
  req.model = {
    Animal,
    seedData,
  };
  next();
});

// -----------------------------------------------------
// Routes INDUCESS
// -----------------------------------------------------
// Index
app.get("/index", async (req, res) => {
  let allAnimals = await Animal.find({});
  res.render("index.ejs", { allAnimals });
});

// New
app.get("/index/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
app.delete("/index/:id/", async (req, res) => {
  let deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
  res.render("deleted.ejs");
});

// Update
app.put("/index/:id", async (req, res) => {
  const id = req.params.id;
  const editedAnimal = req.body;
  let updatedAnimalData = await Animal.findByIdAndUpdate(id, editedAnimal, { new: true });
  res.redirect(`/index/${updatedAnimalData._id}`);
});

// Create
app.post("/index", async (req, res) => {
  if (req.body.extinct === "on") {
    req.body.extinct = true;
  } else {
    req.body.extinct = false;
  }
  console.log(req.body);
  let animalToShow = await Animal.create(req.body);
  res.render("show.ejs", { animalToShow });
});

// Edit
app.get("/index/:id/edit", async (req, res) => {
  let foundAnimal = await Animal.findById(req.params.id);
  res.render("edit.ejs", { foundAnimal });
});

// Seed
app.get("/index/seed", async (req, res) => {
  await Animal.deleteMany({});
  await Animal.create(req.model.seedData);
  let allAnimals = await Animal.find({});
  res.redirect("index.ejs");
});

// Show
app.get("/index/:id", async (req, res) => {
  let animalToShow = await Animal.findById(req.params.id);
  res.render("show.ejs", { animalToShow });
});

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.redirect("/index");
});

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
