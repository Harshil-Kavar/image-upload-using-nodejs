const mongoose = require("mongoose");

const { Schema } = mongoose;

const imgSchema = new Schema({
  filename: String,
  path: String,
  mediumPath: String,
  thumbnailPath: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const ImgModel = mongoose.model("ImgModel", imgSchema);

module.exports = ImgModel;
