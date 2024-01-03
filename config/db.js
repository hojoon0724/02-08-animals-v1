// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------

const mongoose = require("mongoose");

// connect to our database
mongoose.connect(process.env.DATABASE_URL);

// connection status listener
mongoose.connection.on("error", (error) => console.log("there's an error: " + error));
mongoose.connection.on("connected", () => console.log("connected to mongo"));
mongoose.connection.on("disconnected", () => console.log("disconnected to mongo"));
