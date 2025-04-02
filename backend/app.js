const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");

const app = express();

require("dotenv").config();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://clever-cash-website.vercel.app",
  })
);
app.options("*", cors());

// ✅ Routes
readdirSync("./routes").forEach((route) => {
  app.use("/api/v1", require("./routes/" + route));
});

// ✅ Export the app for Vercel
module.exports = app;

// ✅ Local dev server
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
