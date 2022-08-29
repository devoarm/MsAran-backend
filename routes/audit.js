var express = require("express");
var router = express.Router();
var db2 = require("../config/db2");
/* GET users listing. */
router.get("/visit-check", (req, res) => {
  var sql = `SELECT
    pt.hn,
    PtName ( pt.hn, pt.cid ) AS pt_name,
    ov.main_dep_queue, ov.vsttime,
    ov.vn,
    IF(rx.vn IS NULL,'','success') AS cc,
    rx.rx_time,
    k.department,
       ov.cur_dep_time,
       ot.name AS cur_name, 
       k2.department AS cur_dep,
       (select count(vn) from ptdepart where vn = ov.vn) AS count_pt_depart,
  (select count(vn) from ptdepart where vn = ov.vn) AS count_pt_depart
       FROM ovst ov
    LEFT OUTER JOIN patient pt ON pt.hn = ov.hn 
    LEFT OUTER JOIN rx_doctor rx ON rx.vn = ov.vn
    LEFT OUTER JOIN kskdepartment k ON k.depcode = rx.depcode
    LEFT OUTER JOIN kskdepartment k2 ON k2.depcode = ov.cur_dep
       LEFT OUTER JOIN ovstost ot ON ot.ovstost = ov.ovstost
       WHERE ov.vstdate = CURDATE() 
    AND ov.main_dep = "010" 
       GROUP BY ov.vn
       ORDER BY ov.main_dep_queue`;
       db2.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

module.exports = router;
