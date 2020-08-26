const process = require("process");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.KMMMS_MONGOURI || "mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: "kmmms",
  })
  .then(() => console.log("MongoDB connected"))
  .catch(() => {
    console.log("Error in connecting to database");
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

const routes = ["users", "auth", "utils", "images"];
routes.forEach((route) => app.use(`/api/${route}`, require(`./routes/${route}`)));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
