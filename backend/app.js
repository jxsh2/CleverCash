const express = require("express");
const cors = require("cors");
const path = require("path");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();
require("dotenv").config();

// ✅ CORS config
const corsOptions = {
  origin: ["https://clever-cash.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Debug root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running (serverless)");
});

// ✅ Load all route files
const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).forEach((file) => {
  app.use("/api/v1", require(path.join(routesPath, file)));
});

// ✅ Connect to DB
database();

// ✅ EXPORT app for Vercel
module.exports = app;
