var express = require("express");
var router = express.Router();
var db = require("../config/knex/db");
var dbHis = require("../config/knex/dbHis");
var MakeHiController = require("../controllers/MakeHiController");
var moment = require("moment"); // require

/* GET home page. */
router.get("/pdf", async (req, res) => {
  let query = await db("hi_visit as v")
    .innerJoin("hi_profiles as hi", "v.hi_id", "hi.id")
    .groupBy("v.hi_id");
  return res.json({ status: 200, result: query });
});

router.get("/hi_visit", async (req, res) => {
  let query = await db("hi_visit as v")
    .innerJoin("hi_profiles as hi", "v.hi_id", "hi.id")
    .innerJoin("c_hospital as hos", "hi.hospcode", "hos.hoscode")
    .innerJoin("c_district as amp", "hi.amppart", "amp.ampurcodefull")
    .innerJoin("c_subdistrict as tamb", "hi.tmbpart", "tamb.tamboncodefull")
    .innerJoin("c_province as chw", "hi.chwpart", "chw.changwatcode")
    .select(
      "v.*",
      "hi.*",
      "v.vstdate as date",
      "hos.hosname",
      "amp.ampurname as ampurname",
      "tamb.tambonname",
      "chw.changwatname"
    )
    .where("hos.hoscode", "10870")
    .orderBy("v.hi_id")
    .orderBy("v.id");
  // console.log(query[0].hi_id);
  return res.json({ status: 200, result: query });
});

router.get("/add-hi", async function (req, res, next) {
  let hi = await db("hi_profiles").select("*").whereNotNull("hn");
  const hn = await hi.map((item) => {
    return item.hn;
  });
  let HisHi = await dbHis("patient")
    .select("hn", "cid", "birthday")
    .whereIn("hn", hn);
  HisHi.forEach(async (element) => {
    try {
      var bd = await db("hi_profiles")
        .update({ hn: element.hn, birthday: element.birthday })
        .where("hn", element.hn);
      console.log(bd);
    } catch (error) {
      console.log(error);
    }
  });
  res.json(HisHi);
});
router.get("/make-10", async function (req, res, next) {
  let symptom = [
    "มีไข้ ไอ",
    "อ่อนเพลีย",
    "สูญเสียความสามารถในการดมกลิ่นและรับรส",
    "เจ็บคอ",
    "มีไข้",
    "ไอ",
  ];
  let hi = await db("hi_profiles").select("*");

  hi.forEach(async (element, index) => {
    console.log("start date");
    for (let i = 0; i < 10; i++) {
      var bt = Math.random() * (37.2 - 36.7) + 36.7;
      var new_date = moment(element.vstdate, "DD-MM-YYYY")
        .add(i, "days")
        .format("DD-MM-YYYY");
      console.log(new_date);
      console.log(symptom[Math.floor(Math.random() * 6)]);
      await db("hi_visit").insert({
        vstdate: new_date,
        hi_id: element.id,
        O2sat: Math.floor(Math.random() * (100 - 97)) + 97,
        medication: symptom[Math.floor(Math.random() * 6)],
        bt: bt.toFixed(1),
      });
    }
  });
  // console.log("success");

  return res.json(hi.length);
});

module.exports = router;
