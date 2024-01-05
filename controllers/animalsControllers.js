// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const Animal = require("../models/animalsConstructor");

// -----------------------------------------------------
// Router
// -----------------------------------------------------
const router = express.Router();

// -----------------------------------------------------
// Routes
// -----------------------------------------------------
// Index
router.get("/", async (req, res) => {
  try {
    let allAnimals = await Animal.find({});
    res.render("index.ejs", { allAnimals });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// New
router.get("/new", (req, res) => {
  try {
    res.render("new.ejs");
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Delete
router.delete("/:id/", async (req, res) => {
  try {
    let deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    res.render("deleted.ejs");
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    if (req.body.extinct === "on") {
      req.body.extinct = true;
    } else {
      req.body.extinct = false;
    }
    const id = req.params.id;
    const editedAnimal = req.body;
    let updatedAnimalData = await Animal.findByIdAndUpdate(id, editedAnimal, { new: true });
    res.redirect(`/index/${updatedAnimalData._id}`);
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    if (req.body.extinct === "on") {
      req.body.extinct = true;
    } else {
      req.body.extinct = false;
    }
    let animalToShow = await Animal.create(req.body);
    res.render("show.ejs", { animalToShow });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    let foundAnimal = await Animal.findById(req.params.id);
    res.render("edit.ejs", { foundAnimal });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Seed
router.get("/seed", async (req, res) => {
  try {
    await Animal.deleteMany({});
    await Animal.create(req.model.seedData);
    let allAnimals = await Animal.find({});
    res.redirect("index.ejs");
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

// Show
router.get("/:id", async (req, res) => {
  try {
    let animalToShow = await Animal.findById(req.params.id);
    res.render("show.ejs", { animalToShow });
  } catch (error) {
    console.log("=====", error.message, "====");
    res.status(400).send("yo, error. check out the log");
  }
});

module.exports = router;
