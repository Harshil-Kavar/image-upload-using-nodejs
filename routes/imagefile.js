const express = require("express");
const router = express.Router();
const ImgModel = require("../models/ImgModel");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: Storage,
});
// .single("test");

//Route 1 : to add image: POST "/api/addimages"
router.post("/addimages", upload.single("image"), async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Resize full-width image
    await sharp(path).resize(1920, 1080).toFile(`files/full_${filename}`);

    // Resize medium-width image
    await sharp(path).resize(800, 600).toFile(`files/medium_${filename}`);

    // Resize thumbnail image
    await sharp(path).resize(300, 230).toFile(`files/thumb_${filename}`);

    // Save image paths to the database
    const image = await new ImgModel({
      filename: req.body.name,
      path: `../files/full_${filename}`,
      mediumPath: `../files/medium_${filename}`,
      thumbnailPath: `../files/thumb_${filename}`,
      image: {
        data: req.file.filename,
        contentType: "image",
      },
    });
    await image.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

//Route 2 : to get all images: GET "/api/images"
router.get("/images", async (req, res) => {
  try {
    const data = await ImgModel.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
