const mongoose = require("mongoose");

const { Schema } = mongoose;

const imgSchema = new Schema({
  name: { type:String, required: true },
  image:{
    data:Buffer,
    contentType:String
  }
});

const ImgModel = mongoose.model("ImgModel", imgSchema);

module.exports = ImgModel;
