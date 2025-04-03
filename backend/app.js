const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();
require("dotenv").config();

// ✅ CORS Setup: allow your frontend Vercel domain
app.use(
  cors({
    origin: "https://clever-cash-website.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Load all route files
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// ✅ For Vercel
module.exports = app;

// ✅ For local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  database();
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
}
