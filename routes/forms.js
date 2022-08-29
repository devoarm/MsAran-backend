var express = require("express");
var router = express.Router();
const db1 = require("../config/db1");
/* GET home page. */

router.post("/vue-address",(req,res) => {
  db1.query(`SELECT
	c_province.changwatcode,c_district.ampurcodefull,c_subdistrict.tamboncodefull
FROM
	c_subdistrict
	INNER JOIN
	c_district
	ON 
		c_district.ampurcodefull = c_subdistrict.ampurcode
	INNER JOIN
	c_province
	ON 
		c_district.changwatcode = c_province.changwatcode
	
	WHERE c_province.changwatname = '${req.body.chwpart}' AND c_district.ampurname = '${req.body.amppart}' AND c_subdistrict.tambonname = '${req.body.tmbpart}'`,(err,result)=>{
    if(err) return res.json({ status:500, message:err.message})
    if (result.length > 0){
      return res.json({status: 200, result: result[0]})      
    } else{
      return res.json({status: 200, result: {tamboncodefull:"",ampurcodefull:"",changwatcode:""}})
    }    
  })
})
router.post("/find-hoscode",(req, res)=>{  
  // console.log(req.body.hosname)  
  db1.query(`SELECT hoscode FROM c_hospital h WHERE h.hosname = '${req.body.hosname}'`,(err, result)=>{
    if (err) return res.json({ status: 500, message: err})
    if (result.length > 0){
      return res.json({status: 200, result: result[0]})      
    } else{
      return res.json({status: 200, result: {hoscode:""}})
    }    
  })  
})
router.post("/find-pttype",(req, res)=>{    
  db1.query(`SELECT pttype FROM pttype p WHERE p.name = '${req.body.pttype_name}'`,(err, result)=>{
    if (err) return res.json({ status: 500, message: err})
    if (result.length > 0) {
      return res.json({status: 200, result: result[0]})      
    } else {
      return res.json({status: 200, result: {pttype:""}})      
    }    
  })  
})

router.get("/person", function (req, res, next) {
  var sql = "SELECT hi_profiles.cid, hi_profiles.fullname FROM hi_profiles";
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});
router.get("/person-by-hoscode/:hoscode/:role", function (req, res, next) {
  const { hoscode, role } = req.params;
  var sql = "";
  var sql_user = `SELECT
  hi_profiles.cid, 
  hi_profiles.fullname, 
  hi_profiles.hospcode,
  hi_profiles.id
FROM
  hi_profiles
WHERE
  hi_profiles.hospcode = ${hoscode};`;
  var sql_admin = `SELECT
  hi_profiles.cid, 
  hi_profiles.fullname, 
  hi_profiles.hospcode,
  hi_profiles.id
FROM
  hi_profiles`;
  if (role == "User") {
    sql = sql_user;
  } else {
    sql = sql_admin;
  }
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

router.get("/provid", function (req, res, next) {
  var sql = "SELECT id, firstname,lastname FROM users";
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

router.get("/ptt-type", function (req, res, next) {
  var sql = "SELECT pttype.pttype, pttype.`name` FROM pttype";
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

router.get("/c_hospital/:provcode", function (req, res, next) {
  const { provcode } = req.params;
  var sql = `SELECT * FROM c_hospital WHERE c_hospital.provcode = ${provcode}`;
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

router.get("/subdistrict", function (req, res, next) {
  var sql = `SELECT
  c_subdistrict.tambonname, 
	c_subdistrict.tamboncodefull
FROM
  c_subdistrict`;
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});
router.get("/subdistrict-by-district/:id", function (req, res, next) {
  const { id } = req.params;
  console.log(id)
  var sql = `SELECT
	c_subdistrict.tamboncodefull,
  c_subdistrict.tambonname
FROM
  c_subdistrict
WHERE
  c_subdistrict.ampurcode = ${id}`;
  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});
router.get("/district", function (req, res, next) {
  var sql = `SELECT
  c_district.ampurcodefull, 
  c_district.ampurname
FROM
  c_district`;

  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});
router.get("/district-by-province/:id", function (req, res, next) {
  const { id } = req.params;  
  var sql = `SELECT
  c_district.ampurcodefull, 
  c_district.ampurname, 
  c_district.changwatcode
FROM
  c_district
WHERE
  c_district.changwatcode = ${id}`;

  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});
router.get("/province", function (req, res, next) {
  var sql = `SELECT
  changwatcode,changwatname
FROM
  c_province`;

  db1.query(sql, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    else return res.json({ status: 200, result: result });
  });
});

module.exports = router;
