const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const transactionsRoutes = require("./routes/transactions");

const app = express();

require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Routes
app.use("/api/v1", transactionsRoutes);

// ✅ Connect to database in all environments
database();

// Export app for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
}
