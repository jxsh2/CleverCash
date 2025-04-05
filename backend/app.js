const express = require("express");
const cors = require("cors");
const { db } = require("./db/database"); // ✅ Use relative path properly
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config(); // ✅ Should be before anything that depends on .env

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Load all route files inside ./routes and apply with /api/v1 prefix
readdirSync("./routes").forEach((file) => {
  app.use("/api/v1", require(`./routes/${file}`));
});

// Start the server
const server = () => {
  db(); // Connect to MongoDB
  app.listen(port, () => {
    console.log(`✅ Server running on port: ${port}`);
  });
};

server();
