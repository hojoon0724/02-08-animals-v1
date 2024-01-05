// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
require("dotenv").config();
require("./config/db.js");
const seedData = require("./models/seed.js");
const animalController = require("./controllers/animalsControllers.js");

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
// Routes INDUCESS -- Moved
// -----------------------------------------------------
app.use("/index", animalController);

// -----------------------------------------------------
// GET requests
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.send("root response");
});

// -----------------------------------------------------
// Listener
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
