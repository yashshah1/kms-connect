const process = require("process");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const config = require("config");

mongoose
  .connect(config.get("localMongoURI"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: "kmmms",
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.log("Error in connecting to database");
    console.log(err);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
