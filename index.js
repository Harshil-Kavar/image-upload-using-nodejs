const connectTOMongo = require("./db");
const express = require("express");
const cors = require('cors')

connectTOMongo();

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.use("/api", require("./routes/imagefile"));

app.listen(port, () => {
  console.log("http://localhost:"+ port);
});
