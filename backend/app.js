const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();

require("dotenv").config();

// ✅ Allow specific frontend domain
const allowedOrigins = [
  "https://clever-cash-website.vercel.app", // your frontend deployed URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// Auto-load routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

module.exports = app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  database();
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
}
