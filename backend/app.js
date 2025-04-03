const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const transactionsRoutes = require("./routes/transactions");

const app = express();
require("dotenv").config();

// ✅ Define allowed frontend origin (your deployed frontend)
const corsOptions = {
  origin: [
    "https://clever-cash-website.vercel.app/", // your frontend domain
    "http://localhost:3000", // local dev (optional)
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

// ✅ Apply CORS middleware with options
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", transactionsRoutes);

// ✅ Simple health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running.");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Export for Vercel
module.exports = app;

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  const server = () => {
    database();
    app.listen(PORT, () => {
      console.log("✅ Listening on port:", PORT);
    });
  };
  server();
}
