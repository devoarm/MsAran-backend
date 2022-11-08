var express = require("express");
var router = express.Router();
const db1 = require("../config/db1");
const dbHis = require("../config/knex/dbHis");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/lab-hi/:hn", async function (req, res, next) {
  let { hn } = req.params;
  const data = await dbHis("lab_head as lh")
    .leftJoin("doctor as d", "lh.doctor_code", "d.code")
    .leftJoin("patient as p", "p.hn", "lh.hn")
    // .leftJoin("lab_order_service as los", "los.lab_order_number", "lh.lab_order_number")
    .leftJoin("lab_order as lo", "lo.lab_order_number", "lh.lab_order_number")
    .where("lh.hn", hn)
    .select(
      "lh.hn",
      "lh.lab_order_number",
      "lh.order_date",
      "lh.report_date",
      "lh.report_time",
      "lh.department",
      "lh.form_name",
      "lh.order_time",
      "lh.receive_date",
      "lh.receive_time",
      "d.name",
      "p.fname",
      "p.lname",
      "p.birthday",
      "lo.lab_items_name_ref",
      "lo.lab_order_remark",
      "lo.lab_order_result",
      "lo.lab_items_normal_value_ref",
    );
  return res.json(data);
});
router.post("/register", (req, res) => {
  res.json(req.body);
});

module.exports = router;
