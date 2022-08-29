var express = require("express");
var router = express.Router();
const db1 = require("../config/db1");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  try {
    db1.query(
      `SELECT
      pt.hn, PtName (pt.hn, pt.cid) AS pt_name,
      ov.main_dep_queue,
      ov.vn,
      ov.cur_dep_time, ot.name, k.department
 FROM ovst ov
     LEFT OUTER JOIN patient pt ON pt.hn = ov.hn
     LEFT OUTER JOIN kskdepartment k ON k.depcode = ov.cur_dep
     LEFT OUTER JOIN ovstost ot ON ot.ovstost = ov.ovstost
 WHERE ov.vstdate = CURDATE()
     AND ov.main_dep = "010"
 ORDER BY ov.main_dep_queue`,
      (err, result) => {
        res.json({ status: 200, message: result });
      }
    );
  } catch (error) {
    res.send(error);
  }
});
router.post("/register", (req, res) => {
  res.json(req.body);
});

module.exports = router;
