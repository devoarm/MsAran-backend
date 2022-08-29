require("dotenv").config();
const express = require("express");
const router = express.Router();
const db1 = require("../config/db1");
const bcrypt = require("bcrypt");
var randtoken = require("rand-token");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendMail");
// Select Data
router.get("/", auth, (req, res) => {
  res.json({ status: "ok" });
});
router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  db1.query(
    `UPDATE users SET username = '${req.body.username}', firstname = '${
      req.body.firstname
    }', lastname = '${req.body.lastname}', phone = '${
      req.body.phone
    }', email = '${req.body.email}', role = '${
      req.body.role
    }',organigation = '${
      req.body.role == "User" ? req.body.organigation : "0"
    }' WHERE id=${id}`,
    (err, result) => {
      if (err) {
        return res.json({ status: 500, err: err });
      }
      res.json({ status: 200 ,result: result });
    }
  );
});
router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;
  db1.query(`UPDATE users SET status_del = '0' WHERE id=${id}`, (err, rows) => {
    if (err) {
      return res.json({ status: 500, err: err });
    }
    res.json({ status: 200, id: id });
  });
});

router.get("/users", auth, (req, res) => {
  db1.query(
    `SELECT
	users.username, 
	users.id, 
	users.firstname, 
	users.lastname, 
	users.phone, 
	users.email, 
	users.role, 
	IF(users.organigation='0','ผู้ดูแลระบบ',c_hospital.hosname) AS organigation
	
FROM
	users
	LEFT JOIN
	c_hospital
	ON 
		users.organigation = c_hospital.hoscode
WHERE
  status_del = 1`,
    (err, rows) => {
      res.json(rows);
    }
  );
});
router.get("/users-by-id/:id", auth, (req, res) => {
  const { id } = req.params;
  db1.query(
    `SELECT
	users.username, 
	users.id, 
	users.firstname, 
	users.lastname, 
	users.phone, 
	users.email, 
	users.role, 
	IF(users.organigation='0','ผู้ดูแลระบบ',c_hospital.hosname) AS organigation
	
FROM
	users
	LEFT JOIN
	c_hospital
	ON 
		users.organigation = c_hospital.hoscode
WHERE id = '${id}'`,
    (err, rows) => {
      res.send(rows[0]);
    }
  );
});
router.post("/login", (req, res) => {
  db1.query(
    "SELECT * FROM users WHERE username=?",
    [req.body.username],
    (err, user, fields) => {
      if (err) return res.json(err);
      if (user.length == 0)
        return res.json({ status: "error", message: "username not found" });
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ username: user[0].username }, secret);
            res.json({
              status: 200,
              message: "success",
              userData: user[0],
              token,
            });
          } else {
            res.json({ status: "error", message: "password not found" });
          }
        }
      );
    }
  );
});
router.get("/logout", auth, (req, res) => {
  const authHeader = req.headers["authorization"];
  var token = jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out", token });
    } else {
      res.send({ msg: "Error" });
    }
  });
});
router.post("/forgot-password", (req, res) => {
  var token = randtoken.generate(20);
  const email = req.body.email;
  var username = "";
  db1.query(`SELECT email,username FROM users WHERE email = '${email}'`, (err, rows) => {
    if (err) return res.json(err);
    else {
      username = rows[0].username;
      if (rows.length == 0) {
        return res.json({ status: 300, msg: "email is null" });
      } else {
        db1.query(
          `UPDATE users SET token_reset_password = '${token}' WHERE email='${email}'`,
          async (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            else {
              // console.log(rows)
              try {                
                await sendEmail(
                  email,
                  "รีเซ็ตรหัสผ่าน ระบบMsAranhos",
                  token,
                  username
                );
                return res.json({ status:200,msg:"Ok"})
              } catch (error) {
                return res.json({ status:500,msg:error})                
              }
            }
            // res.json({ status: 200, msg: "Ok" });
          }
        );
      }
    }
  });
});
router.post(`/reset-password/:token`, async (req, res) => {
  const { token } = req.params;
  db1.query(
    `SELECT token_reset_password FROM users WHERE token_reset_password = '${token}'`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      if (rows.length > 0) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          db1.query(
            `UPDATE users SET password = '${hash}' WHERE token_reset_password = '${token}'`,
            (err, result, fields) => {
              if (err) return res.json(err);
              res.json({ status: 200, message: "success" });
            }
          );
        });
      } else {
        if (err) return res.json({ status: 401, msg: "token not found" });
      }
    }
  );
});
router.post("/register", (req, res) => {
  db1.query(
    "SELECT * FROM users WHERE `username` = ?",
    [req.body.username],
    (err, result, fields) => {
      if (err) return res.json({ status: 401, message: "Failed" });
      if (result.length > 0) {
        return res.json({ status: 300, message: "already have" });
      } else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          db1.query(
            "INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `phone`, `email`, `role`,`organigation`) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
            [
              req.body.username,
              hash,
              req.body.firstname,
              req.body.lastname,
              req.body.phone,
              req.body.email,
              req.body.role,
              req.body.role == "User" ? req.body.hoscode : "0",
            ],
            (err, result, fields) => {
              if (err) return res.json(err);
              res.json({ status: 200, message: "success" });
            }
          );
        });
      }
    }
  );
});

module.exports = router;
