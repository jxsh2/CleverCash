const express = require("express");
const cors = require("cors");
const { database } = require("./db/database");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

// ✅ CORS configuration
const corsOptions = {
  origin: ["https://clever-cash.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  database();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
