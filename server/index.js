const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 14700;
const ip = process.env.IP || "127.0.0.1";
process.env.SECRET_KEY = "abc";
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

const authCredentials = require("./attributes/auth-credentials.attr");
const authCtrl = require("./controllers/auth.ctrl");
app.use("/auth", authCredentials, authCtrl);

const adminCredentials = require("./attributes/admin-credentials.attr");
const adminCtrl = require("./controllers/admin.ctrl");
app.use("/admin", adminCredentials, adminCtrl);

const userCredentials = require("./attributes/user-credentials.attr");
const userCtrl = require("./controllers/user.ctrl");
app.use("/user", userCredentials, userCtrl);

app.get("/img", function (req, res) {
  res.sendFile(path.join(__dirname, "././controllers/uploads", req.query.i));
});

app.listen(PORT, () => console.log(`listening at ${PORT}`));
