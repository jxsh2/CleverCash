const express = require("express");
const cors = require("cors");
const { db } = require("../backend/db/database");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Test route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

// Routes
readdirSync("./routes").map((route) =>
  app.use("/", require("./routes/" + route))
);

// Start server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
