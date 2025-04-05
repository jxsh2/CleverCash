const express = require("express");
const cors = require("cors");
const path = require("path");
const { database } = require("./db/database");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
const corsOptions = {
  origin: ["https://clever-cash.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Root route for debugging
app.get("/", (req, res) => {
  res.send("✅ Backend is running and connected.");
});

// ✅ Load all routes from routes folder safely using absolute path
const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).forEach((file) => {
  app.use("/api/v1", require(path.join(routesPath, file)));
});

// ✅ Connect to DB and start server
const server = () => {
  database();
  app.listen(PORT, () => {
    console.log(`✅ Backend is running on port: ${PORT}`);
  });
};

server();
