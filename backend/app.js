const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const transactionsRoutes = require("./routes/transactions"); // 🔁 static import

const app = express();

require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", transactionsRoutes); // ✅ static, vercel-compatible

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
