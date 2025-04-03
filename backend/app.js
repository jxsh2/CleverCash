const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();

require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1/", require("./routes/" + route))
);

// Export the app for Vercel
module.exports = app;

// For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  const server = () => {
    database();
    app.listen(PORT, () => {
      console.log("listening to port:", PORT);
    });
  };
  server();
}
