const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "vacation",
});

const PORT = 14700;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/img", function (req, res) {
  res.sendFile(path.join(__dirname, "uploads", req.query.i));
  console.log(req.query.i);
});

app.get("/vacations", function (req, res) {
  connection.query("SELECT * FROM place", function (err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage });
//passing multer as middleware
app.post("/adduser", upload.any(), function (req, res) {
  let sql = `INSERT INTO place (place_user_id ,description, destination, image, date, price)
            VALUES(?, ?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      1,
      req.body.Description,
      req.body.Destination,
      "http://localhost:14700/img?i=" + req.files[0].filename,
      req.body.Date,
      req.body.Price,
    ],
    function (err, data) {
      if (err) {
        throw err;
      } else {
        return res.send(data.insertId.toString());
      }
    }
  );
});

app.listen(PORT, () => console.log(`listening at ${PORT}`));

//
//
//
//
//
//
//
// app.get("/vacation", function (req, res) {
//   connection.query("SELECT * FROM place", function (error, results, fields) {
//     if (error) throw error;
//     console.log("The solution is: ", results[0]);
//     return res.json(results);
//   });
// });

// app.get("/img", function (req, res) {
//   res.sendFile(path.join(__dirname, "uploads", "logo.png"));
// });

// app.get('/tenant/search', function (request, response) {
//   if (request.query.phone) {
//      connection.query('SELECT tenant_id FROM tenants WHERE tenant_mobile = ?', [request.query.phone], function (err, res) {
//         if (err) return response.status(400).send();
//         if (res.length == 0) return response.status(404).send();

//         return response.send(res[0].tenant_id.toString());
//      })
//   } else {
//      return response.status(400).send();
//   }
// });

// app.post('/ticket/:tenantid', function (request, response) {
//   const { tenantid } = request.params;

//   connection.query('INSERT INTO tickets (ticket_tenant_id, ticket_fields) VALUES (?, ?)', [Number(tenantid), JSON.stringify(request.body)], function (err, res) {
//      if (err) return response.status(400).send();
//      response.send(res.insertId.toString());
//   })
// });

// app.get("/dev/:id", function (request, response) {
//   const { id } = request.params; // params are the URL parameters
//   connection.query(
//     "SELECT * FROM dev_meetings WHERE team_id = ?",
//     [id],
//     function (err, result) {
//       if (err) throw err;
//       return response.json(result);
//     }
//   );
// });

// app.post("/meeting", function (request, response) {
//   connection.query(
//     "INSERT INTO  dev_meetings (team_id, meet_start, meet_end, meet_title, meet_room) VALUES (?, ?, ?, ?, ?)",
//     [
//       request.body.team_id,
//       request.body.meet_start,
//       request.body.meet_end,
//       request.body.meet_title,
//       request.body.meet_room,
//     ],
//     function (err, res) {
//       if (err) return response.status(400).send();
//       response.send(res.insertId.toString());
//     }
//   );
// });
