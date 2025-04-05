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

readdirSync("./routes").map((route) =>
  app.use("/", require("./routes/" + route))
);

database();

module.exports = app;
