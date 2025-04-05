const express = require("express");
const cors = require("cors");
const { db } = require("../backend/db/database");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});
//routes
readdirSync("./routes").map((route) =>
  app.use("/", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
