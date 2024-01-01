// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const mongoose = require("mongoose");

// Create data structure schema for mongoose
const animalsSchema = new mongoose.Schema({
  species: { type: String, required: true },
  extinct: { type: Boolean, required: true },
  location: { type: String, required: true },
  lifeExpectancy: { type: String, required: true },
});

// Use the mongoose Schema as constructor
const Animal = mongoose.model("Animal", animalsSchema);

// Export constructor so that it can be used in the app
module.exports = Animal;
