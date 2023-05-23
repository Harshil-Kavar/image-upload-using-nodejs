const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/sample-imgstore";

const connectTOMongo = () => {
  mongoose.connect(mongoURI);
};

module.exports = connectTOMongo