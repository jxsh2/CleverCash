const express = require("express");
const cors = require("cors");
const { db } = require("../backend/db/database");
const { readdirSync } = require("fs");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(port, () => {
    console.log(`listening to port: ${port}`);
  });
};

server();
