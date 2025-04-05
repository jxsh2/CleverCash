const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");
const path = require("path");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: ["https://clever-cash.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Log all incoming requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Health check
app.get("/", (_req, res) => res.send("✅ API is running"));

// Dynamically load routes
const routesPath = path.join(__dirname, "routes");
console.log("Loading routes from:", routesPath);
readdirSync(routesPath).forEach((file) => {
  console.log(`Loading route file: ${file}`);
  app.use("/", require(`${routesPath}/${file}`));
});

// Connect to DB
database();

module.exports = app;
