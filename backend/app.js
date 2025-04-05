const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");
const path = require("path");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: ["https://clever-cash.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Health check
app.get("/", (_req, res) => res.send("✅ API is running"));

// Load routes
const routesPath = path.join(__dirname, "routes");
console.log("Routes directory:", routesPath);
const routeFiles = readdirSync(routesPath);
if (routeFiles.length === 0) {
  console.log("No route files found in routes directory!");
} else {
  routeFiles.forEach((file) => {
    console.log(`Loading route file: ${file}`);
    const route = require(`${routesPath}/${file}`);
    app.use("/", route);
  });
}

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

database();

module.exports = app;
