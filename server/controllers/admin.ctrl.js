const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const adminRepository = require("./../repositories/admin.repository");

const router = express.Router();

router.post("/newplace", function (req, res) {
  if (req.files) {
    req.files["Image"].mv(
      __dirname + "/uploads/" + req.files.Image.name,
      function (err) {
        if (err) {
          return res.status(500).send();
        }
        res.send();
      }
    );
  } else {
    res.status(500).send();
  }
  console.log(req.token_id);
  adminRepository.addPlace(
    {
      place_user_id: 1,
      description: req.body.Description,
      destination: req.body.Destination,
      image: req.files.Image.name,
      date: req.body.Date,
      place: req.body.Price,
    },
    function (err, result) {
      if (err) throw err;
      return res.status(201).send("inserted place and follow");
    }
  );
});

router.post("/update", function (req, res) {
  if (req.files) {
    req.files["Image"].mv(
      __dirname + "/uploads/" + req.files.Image.name,
      function (err) {
        if (err) {
          return res.status(500).send();
        }
        res.send();
      }
    );
  } else {
    res.status(500).send();
  }

  adminRepository.updatePlace(
    {
      place_id: req.body.Id,
      description: req.body.Description,
      destination: req.body.Destination,
      image: req.files.Image.name,
      date: req.body.Date,
      place: req.body.Price,
    },
    function (err, result) {
      if (err) throw err;
      return res.status(201).send("updated place");
    }
  );
});

router.get("/img", function (req, res) {
  res.sendFile(path.join(__dirname, "uploads", req.query.i));
});

router.get("/getplaces", function (req, res) {
  adminRepository.getPlaces(function (err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});

router.delete("/vacation/:id/:img", function (req, res) {
  const { id, img } = req.params;
  const path = "./uploads/";
  fs.readdirSync(path).forEach((file) => {
    if (file === img) {
      fs.unlinkSync(path + file);
    }
  });

  adminRepository.deleteFollow(id, function (err, result) {
    if (err) throw err;
  });
  adminRepository.deletePlace(id, function (err, result) {
    if (err) throw err;
  });

  res.send("id");
});

module.exports = router;

// // multer used for uploading files/images
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + "/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
//   },
// });
// let upload = multer({ storage: storage });

// // passing multer as middleware
// router.post("/newplace", upload.any(), function (req, res) {
//   adminRepository.addPlace(
//     {
//       place_user_id: 1,
//       description: req.body.Description,
//       destination: req.body.Destination,
//       // image: req.files[0].filename,
//       image: req.files.Image.name,
//       date: req.body.Date,
//       place: req.body.Price,
//     },
//     function (err, result) {
//       if (err) throw err;
//       return res.status(201).send("inserted place and follow");
//     }
//   );
// });
