const express = require("express");
const router = express.Router();
const ImgModel = require("../models/ImgModel");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "files",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("test");

//Route 1 : to get all images: GET "/api/images"
router.get("/images", async (req, res) => {
  try {
    const data = await ImgModel.find()
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
});

//Route 2 : to add image: POST "/api/addimages"
router.post("/addimages", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = ImgModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image",
        },
      });
      newImage
        .save()
        .then(() => {
          console.log(req.body);
          return res.status(200).json({ message: "Uploaded Successfuly" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
