const express = require("express");
const cors = require("cors");
const path = require("path");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: ["https://clever-cash.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json("✅ Backend is running (serverless)");
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
