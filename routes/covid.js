const express = require("express");
const { json } = require("express/lib/response");
const router = express.Router();
// const db1 = require('../db_config')
const path = require("path");
const auth = require("../middleware/auth");
const fs = require("fs");
const PushHiController = require("../controllers/PushHiController");
const db1 = require("../config/db1");
const db2 = require("../config/db2");
const db = require("../models");
const HiController = require("../controllers/HiController");
const SiController = require("../controllers/SiController");
router.get("/", async (req, res) => {
  res.json("covid");
});
router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;
  db2.query(
    `SELECT 
	o.bw as weight, 
	o.height 
FROM opdscreen o 
WHERE o.hn = ${id}`,
    (err, result) => {
      if (err) return res.json({ status: 500, message: err });
      return res.json({ status: 200, result: result[0] });
    }
  );
});
router.get("/count-hi-all", async (req, res) => {
  const { id } = req.params;
  db1.query(
    `SELECT 
    COUNT(*) as hi
  FROM hi_profiles hi`,
    (err, result) => {
      if (err) return res.json({ status: 500, message: err });
      return res.json({ status: 200, result: result[0] });
    }
  );
});
router.get("/seach-hi/:srug", async (req, res) => {
  const { srug } = req.params;
  db1.query(
    `SELECT	
	hi_profiles.id,
	hi_profiles.vn,
	hi_profiles.hn, 
	hi_profiles.cid, 
	hi_profiles.fullname, 
	hi_profiles.sex, 
	hi_profiles.image, 
	hi_profiles.birthday, 
	hi_profiles.pttype_name, 
	hi_profiles.mobile, 
	hi_profiles.addrpart, 
	c_subdistrict.tambonname AS tmbpart, 
	c_district.ampurname AS amppart, 
	c_province.changwatname AS chwpart, 
	hi_profiles.weight, 
	hi_profiles.height, 
	hi_profiles.bp,         
	DATE_FORMAT(hi_profiles.swabdate,'%d-%m-%Y') as swabdate,
	hi_profiles.swabtype,
	hi_profiles.need_favi,
	hi_profiles.pr, 
	DATE_FORMAT(hi_profiles.vstdate,'%d-%m-%Y') as vstdate,
	DATE_FORMAT(hi_profiles.dcdate,'%d-%m-%Y') as dcdate,
	c_hospital.hosname AS hospcode, 
	hi_profiles.authen_number, 
	hi_profiles.line_id,
	authen.claim_code,
	authen.authen_date,
	LEFT(authen.pttype_name ,5) AS pttype_authen,
	authen.type_audit
FROM hi_profiles
	LEFT JOIN c_hospital ON  hi_profiles.hospcode = c_hospital.hoscode
	LEFT JOIN c_district ON  hi_profiles.amppart = c_district.ampurcodefull
	LEFT JOIN  c_subdistrict ON  hi_profiles.tmbpart = c_subdistrict.tamboncodefull
	LEFT JOIN c_province ON  hi_profiles.chwpart = c_province.changwatcode
	LEFT JOIN authen ON hi_profiles.cid = authen.cid
	INNER JOIN (SELECT hi.id, DATE(NOW())-(DATE(hi.vstdate))  AS hiv FROM hi_profiles hi ) hi_moon ON hi_moon.id = hi_profiles.id
WHERE 
		hi_profiles.cur_dep = 075 AND		
		hi_profiles.cid LIKE '${srug}%'`,
    (err, result) => {
      if (err) return res.json({ status: 500, message: err });
      return res.json({ status: 200, message: result });
    }
  );
});
router.post("/add-hoscode-personal/:idHi", async (req, res) => {
  const { idHi } = req.params;
  try {
    let query = await db.hi_profile.update(req.body, {
      where: {
        id: idHi,
      },
    });
    return res.json({ status: 200, result: query });
  } catch (error) {
    return res.json({ status: 500, result: error });
  }
});
router.get("/hi-row", async (req, res) => {
  let data = await db.hi_profile.findAll();
  res.json(data.length);
});
router.get("/hi-ten-day/:hospcode", auth, HiController.hiTenDay);
router.delete("/hi/:id", async (req, res) => {
  const { id } = req.params;
  db1.query(`DELETE FROM hi_profiles WHERE id= ${id}`, (err, result) => {
    if (err) return res.json({ status: 500, message: err });
    return res.json({ status: 200, message: result });
  });
});
// อัพเดท hi
router.put("/hi-edit/:id", async (req, res) => {
  let paresData = JSON.parse(req.body.data);
  paresData.vstdate == "" ? (paresData.vstdate = null) : null;
  paresData.swabdate == "" ? (paresData.swabdate = null) : null;
  paresData.dcdate == "" ? (paresData.dcdate = null) : null;
  // return res.json(paresData)
  const { id } = req.params;
  if (!req.files) {
    try {
      let result = await db.hi_profile.update(paresData, {
        where: {
          id: id,
        },
      });
      return res.json({ status: 200, msg: result });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error });
    }
  } else {
    let myFile = req.files.file;
    let newPath = `images/covid/avatar/${Date.now()}-${myFile.name}`;
    paresData.image = newPath;
    try {
      if (fs.existsSync(`${path.resolve()}/public/${paresData.image}`)) {
        fs.unlink(
          `${path.resolve()}/public/${paresData.image}`,
          function (err) {
            if (err) {
              throw err;
            } else {
              console.log("Successfully deleted the file.");
            }
          }
        );
      }
    } catch (err) {
      res.send(err);
      console.error(err);
    }

    // // mv() method places the file inside public directory
    myFile.mv(`${path.resolve()}/public/${newPath}`, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "notOk" });
      }
      try {
        let result = await db.hi_profile.update(paresData, {
          where: {
            id: id,
          },
        });
        return res.json({ status: 200, msg: result });
      } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: error });
      }
    });
  }
  // // accessing the file
});
router.get("/", async (req, res) => {
  res.send(path.resolve());
});
//ดึงข้อมูล hi by id
router.get("/hi-by-id/:id", async (req, res) => {
  const { id } = req.params;
  db1.query(
    `SELECT
    hi_profiles.id, 
    hi_profiles.hn, 
    hi_profiles.cid, 
    hi_profiles.fullname, 
    hi_profiles.sex,
    hi_profiles.image, 
    DATE_FORMAT(hi_profiles.birthday,'%d-%m-%Y') as birthday,    
		hi_profiles.pttype,
    pttype.name as pttype_name,  
    hi_profiles.mobile, 
    hi_profiles.department,
    hi_profiles.addrpart,     
    IF(hi_profiles.swabdate IS NULL, '', hi_profiles.swabdate)  as swabdate,     
    c_subdistrict.tambonname AS tmbpart, 
    c_district.ampurname AS amppart, 
    c_province.changwatname AS chwpart, 
    year(curdate())-year(birthday) as age,
    hi_profiles.weight, 
    hi_profiles.height, 
    hi_profiles.swabtype,
    hi_profiles.need_favi,    
    hi_profiles.stapdown,    
    hi_profiles.need_paniculata,    
    hi_profiles.bp, 
    hi_profiles.pr,     
    IF(hi_profiles.vstdate IS NULL, '', hi_profiles.vstdate)  as vstdate, 
    IF(hi_profiles.dcdate IS NULL, '', hi_profiles.dcdate)  as dcdate,     
    DATE_FORMAT(hi_profiles.vstdate,'%d-%m-%Y') as vstdate1,
    DATE_FORMAT(hi_profiles.dcdate,'%d-%m-%Y') as dcdate1,
    DATE_FORMAT(hi_profiles.swabdate,'%d-%m-%Y') as swabdate1,
    IF(hi_profiles.dcdate IS NULL,'กำลังรักษา','รักษาแล้ว') AS hi_type, 
    c_hospital.hosname AS hospcode, 
    hi_profiles.authen_number, 
    hi_profiles.line_id, 
    c_hospital.hoscode AS obj_hoscode, 
    pttype.pttype AS obj_pttype,
    DATE_FORMAT((hi_profiles.swabdate + INTERVAL 10 DAY),'%d-%m-%Y') AS dateDue,
    DATE(NOW())-(DATE(hi_profiles.vstdate)) AS datePast
  FROM
    hi_profiles
    LEFT JOIN
    c_hospital
    ON 
      hi_profiles.hospcode = c_hospital.hoscode
    LEFT JOIN
    pttype
    ON 
      hi_profiles.pttype = pttype.pttype
    LEFT JOIN
    c_district
    ON 
      hi_profiles.amppart = c_district.ampurcodefull
    LEFT JOIN
    c_subdistrict
    ON 
      hi_profiles.tmbpart = c_subdistrict.tamboncodefull
    LEFT JOIN
    c_province
    ON 
      hi_profiles.chwpart = c_province.changwatcode
WHERE
	hi_profiles.id = ${id}
`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err.message });
      return res.json(rows[0]);
    }
  );
});
//นำเข้าข้อมูล hi_profiles
router.get("/push_Hi", auth, PushHiController.PushHiApi);
//คอนเฟริม hi ครบ 10 วัน
router.get(`/confirme-hi-success/:id`, auth, async (req, res) => {
  const { id } = req.params;
  db1.query(
    `UPDATE hi_profiles SET dcdate = NOW() WHERE id = ${id}`,
    (err, result) => {
      if (err) return res.json({ status: 500, message: err.message });
      return res.json({ status: 200, result: result });
    }
  );
});
//ดึงข้อมูล hi
router.get("/hi/:hospcode", auth, HiController.hi);
// hi ทั้งหมด
router.get("/hi-all/:hospcode", auth, HiController.hiAll);
//ดึงข้อมูล hi new
router.get("/hi_new/:hospcode", auth, HiController.hiNew);
//ดึงข้อมูล hi รักษาเสร็จแล้ว
router.get("/hi_success/:hospcode", auth, HiController.hiSuccess);

router.get("/confirme-hi/:id", auth, HiController.confirmeHi);
//ดึงข้อมูล si
router.get("/si/:hospcode", auth, SiController.si);
router.get("/si-new/:hospcode", auth, SiController.siNew);
router.get("/si_success/:hospcode", auth, SiController.siSuccess);

//ดึงข้อมูล visit hi
router.get("/visit-by-id/:id", async (req, res) => {
  const { id } = req.params;
  db1.query(
    `SELECT
    hi_visit.*		
FROM hi_visit
 INNER JOIN hi_profiles ON hi_visit.hi_id = hi_profiles.id
WHERE hi_profiles.id = ${id}
ORDER BY hi_visit.id`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err.message });
      return res.json(rows);
    }
  );
});

//ดึงข้อมูล chart Hi เทียบ SI
router.get("/chart_hisi", auth, async (req, res) => {
  db1.query(
    `SELECT
    h.hospcode,
    ch.hosname,
    sum(IF(h.cur_dep = 075,1,'')) as hi,
		sum(IF(h.cur_dep = 076,1,'')) as si
    FROM hi_profiles h 
    INNER JOIN c_hospital ch ON h.hospcode = ch.hoscode
    GROUP BY h.hospcode
    ORDER BY h.hospcode
`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      return res.json(rows);
    }
  );
});

//ดึงข้อมูล chart hi
router.get("/chart_hi", auth, async (req, res) => {
  db1.query(
    `SELECT
    h.hospcode,
    ch.hosname,
    COUNT(h.id) as total
    FROM hi_profiles h 
    INNER JOIN c_hospital ch ON h.hospcode = ch.hoscode
    where h.cur_dep = 075
    GROUP BY h.hospcode
    ORDER BY h.hospcode
`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      return res.json(rows);
    }
  );
});

router.get("/chart_si", auth, async (req, res) => {
  db1.query(
    `SELECT
    h.hospcode,
    ch.hosname,
    COUNT(h.id) as total
    FROM hi_profiles h 
    INNER JOIN c_hospital ch ON h.hospcode = ch.hoscode
    where h.cur_dep = 076
    GROUP BY h.hospcode
    ORDER BY h.hospcode
`,
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      return res.json(rows);
    }
  );
});

router.post("/hi-add-patient-avatar", async (req, res) => {
  let paresData = JSON.parse(req.body.data);
  paresData.vstdate == "" ? (paresData.vstdate = null) : null;
  paresData.swabdate == "" ? (paresData.swabdate = null) : null;
  paresData.dcdate == "" ? (paresData.dcdate = null) : null;
  var newPath = null;
  var myFile = null;
  var data = [];
  console.log(data);
  if (req.files) {
    myFile = req.files.file;
    newPath = `images/covid/avatar/${Date.now()}-${myFile.name}`;
    paresData.image = newPath;
    myFile.mv(`${path.resolve()}/public/${newPath}`, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
      }
      try {
        let result = await db.hi_profile.create(paresData);
        return res.json({ status: 200, result: result });
      } catch (error) {
        return res.json({ status: 500, result: error });
      }
    });
  } else {
    try {
      let result = await db.hi_profile.create(paresData);
      return res.json({ status: 200, result: result });
    } catch (error) {
      return res.json({ status: 500, result: error });
    }
  }
});

router.post("/hi-add-visit", async (req, res) => {
  let data = [
    req.body.hi_id,
    req.body.vstdate,
    req.body.period,
    req.body.bt,
    req.body.O2sat,
    req.body.medication,
    req.body.note,
    req.body.provid,
  ];

  db1.query(
    `INSERT INTO hi_visit (hi_id,vstdate,period, bt, O2sat, medication, note, provid) VALUES (?)`,
    [data],
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      return res.json({ status: 200, msg: rows });
    }
  );
});

router.post("/hi-add-visit-id", async (req, res) => {
  let paresData = JSON.parse(req.body.data);

  console.log(paresData);

  let data = [
    paresData.hi_id.value,
    paresData.vstdate,
    paresData.period,
    paresData.id_card.value,
    paresData.bt,
    paresData.O2sat,
    paresData.medication,
    paresData.note,
    paresData.provid.value,
  ];

  db1.query(
    `INSERT INTO hi_visit (hi_id,vstdate,period,id_card, bt, O2sat, medication, note, provid) VALUES (?)`,
    [data],
    (err, rows) => {
      if (err) return res.json({ status: 500, msg: err });
      return res.json({ msg: "Ok", resule: rows });
    }
  );
});

//ผู้ป่วยนอน
router.get("/allstate/:date", async (req, res, bed_date) => {
  const { date } = req.params;
  db2.query(
    `
    select p.cid CID,p.fname FNAME,p.lname LNAME,w.name WARD_NAME,a.regdate ADMIT_DATE,a.dchdate DISCHARGE_DATE,i.dchtype DISCHARGE_TYPE
  ,CASE
    WHEN a.regdate = DATE(NOW()) THEN 'NEW Case'
    WHEN a.dchdate = DATE(NOW()) THEN 'DisCharge'
    ELSE '- Stay -'
  END State
  from an_stat a 
  LEFT JOIN ipt i on i.an = a.an
  LEFT JOIN ward w on w.ward = i.ward
  LEFT JOIN patient p on p.hn = a.hn
  where (a.dchdate is null or a.dchdate = '' or i.regdate = "${date}" or i.dchdate = "${date}")
  and w.ward in ("16","14","12","18","19","20","21","22")`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

// router.get("/bed", async (req, res) => {
//   const sql = await sequelize.query(`
//   select GROUP_CONCAT(distinct w.name) wardName
// ,(select sum(bedcount) from ward where shortname = w.shortname) bedLimit
// ,count(distinct a.an,if(a.regdate = date(now()),1,null)) newCase
// ,(select count(distinct an) from ipt where ward = i.ward and dchdate = date(now())) disCharge
// ,count(distinct a.an) Stay
// ,CASE
//     WHEN (select sum(bedcount) from ward where shortname = w.shortname) > count(distinct a.an) THEN concat('[ ',(select sum(bedcount) from ward where shortname = w.shortname)-count(distinct a.an),' ]')
//     WHEN (select sum(bedcount) from ward where shortname = w.shortname) < count(distinct a.an) THEN concat('-- Over : ',count(distinct a.an)-(select sum(bedcount) from ward where shortname = w.shortname),' !!!')
//     ELSE '- Full -'
// END State,w.shortname
//   from an_stat a
//   LEFT JOIN ipt i on i.an = a.an
//   LEFT JOIN ward w on w.ward = i.ward
//   where (a.dchdate is null or a.dchdate = '')
//   and w.ward in ("16","14","12","18","19","20","21","22")
//   group by w.shortname
//   order by w.shortname`, {
//     type: QueryTypes.SELECT,
//   });
//   res.json(sql)
// });

//จำนวนเตียง
router.get("/bed", (req, res) => {
  db2.query(
    `select GROUP_CONCAT(distinct w.name) wardName
  ,(select sum(bedcount) from ward where shortname = w.shortname) bedLimit
  ,count(distinct a.an,if(a.regdate = date(now()),1,null)) newCase
  ,(select count(distinct an) from ipt where ward = i.ward and dchdate = date(now())) disCharge
  ,count(distinct a.an) Stay
  ,CASE
      WHEN (select sum(bedcount) from ward where shortname = w.shortname) > count(distinct a.an) THEN concat('[ ',(select sum(bedcount) from ward where shortname = w.shortname)-count(distinct a.an),' ]')
      WHEN (select sum(bedcount) from ward where shortname = w.shortname) < count(distinct a.an) THEN concat('-- Over : ',count(distinct a.an)-(select sum(bedcount) from ward where shortname = w.shortname),' !!!')
      ELSE '- Full -'
  END State,w.shortname
    from an_stat a 
    LEFT JOIN ipt i on i.an = a.an
    LEFT JOIN ward w on w.ward = i.ward
    where (a.dchdate is null or a.dchdate = '')
    and w.ward in ("16","14","12","18","19","20","21","22")
    group by w.shortname
    order by w.shortname`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/", (req, res) => {
  console.log(db1);
});

//รายละเอียดเตียง
// router.get("/bedDetail", async (req, res) => {
//   const sql = await sequelize.query(`select
//   p.cid CID,
//   p.fname FNAME,
//   p.lname LNAME,
//   w.ward,
//   w.name WARD_NAME,
//   ia.bedno,
//   a.regdate ADMIT_DATE,
//   a.dchdate DISCHARGE_DATE,
//   i.dchtype DISCHARGE_TYPE
//   ,CASE
//     WHEN a.regdate = DATE(NOW()) THEN 'NEW Case'
//     WHEN a.dchdate = DATE(NOW()) THEN 'DisCharge'
//     ELSE '- Stay -'
//   END State
//   from an_stat a
//   LEFT JOIN ipt i on i.an = a.an
//   LEFT JOIN ward w on w.ward = i.ward
//   LEFT JOIN patient p on p.hn = a.hn
//   LEFT JOIN iptadm ia ON a.an = ia.an
//   where (a.dchdate is null or a.dchdate = '' or i.regdate = date(now()) or i.dchdate = date(now()))
//   and w.ward in ("16","14","12","18","19","20","21","22");
//   `, {
//     type: QueryTypes.SELECT,
//   });
//   res.json(sql)
// });

router.get("/bedDetail", (req, res) => {
  db2.query(
    `select 
  p.cid CID,
  p.fname FNAME,
  p.lname LNAME,
  w.ward,
  w.name WARD_NAME,
  ia.bedno,
  a.regdate ADMIT_DATE,
  a.dchdate DISCHARGE_DATE,
  i.dchtype DISCHARGE_TYPE
  ,CASE
    WHEN a.regdate = DATE(NOW()) THEN 'NEW Case'
    WHEN a.dchdate = DATE(NOW()) THEN 'DisCharge'
    ELSE '- Stay -'
  END State
  from an_stat a 
  LEFT JOIN ipt i on i.an = a.an
  LEFT JOIN ward w on w.ward = i.ward
  LEFT JOIN patient p on p.hn = a.hn
  LEFT JOIN iptadm ia ON a.an = ia.an
  where (a.dchdate is null or a.dchdate = '' or i.regdate = date(now()) or i.dchdate = date(now()))
  and w.ward in ("16","14","12","18","19","20","21","22");`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

//ดึงจากห้องโควิดเพื่อขอ code สปสช.
router.get("/authen/:date", async (req, res, covid_date) => {
  const { date } = req.params;
  db2.query(
    `
  SELECT
  ov.vstdate,
  ov.vn,
  ov.hn,
  ov.spclty,
  ov.main_dep,
  pt.cid,
  CONCAT(pt.pname,pt.fname," ",pt.lname) AS fullname, 
  py.pttype,
  py.name ,
  pt.hometel,
  ps.father_cid,
  ps.mother_cid,
  lab.lab_items_code,
  lab.lab_items_name_ref
  
  FROM ovst ov
  LEFT JOIN patient pt on pt.hn=ov.hn
  LEFT JOIN person ps on ps.patient_hn = ov.hn
  LEFT JOIN pttype py on py.pttype = ov.pttype
  LEFT JOIN (
  SELECT
  lh.vn, 
  lo.lab_order_number,
  lo.lab_items_code,
  lo.lab_items_name_ref,
  lo.lab_order_result
  FROM lab_order lo
  LEFT JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
  WHERE lo.lab_items_code IN('1628','1837','1839','1852','1854')
  ) lab ON ov.vn = lab.vn
  
  WHERE 
  ov.vstdate = "${date}"
  AND ov.main_dep = 073`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

//ดึงจากการตรวจ lab
router.get("/screenLab/:date", async (req, res, covid_date) => {
  const { date } = req.params;
  db2.query(
    `
  SELECT
  ov.vstdate,
  ov.vn,
  ov.hn,
  ov.spclty,
  ov.main_dep,
  pt.cid,
  CONCAT(pt.pname,pt.fname," ",pt.lname) AS fullname, 
  py.pttype,
  py.name,
  pt.hometel,
  ps.father_cid,
  ps.mother_cid,
  lab.lab_items_code,
  lab.lab_items_name_ref
  
  FROM ovst ov
  LEFT JOIN patient pt on pt.hn=ov.hn
  LEFT JOIN person ps on ps.patient_hn = ov.hn
  LEFT JOIN pttype py on py.pttype = ov.pttype
  LEFT JOIN (
  SELECT
  lh.vn, 
  lo.lab_order_number,
  lo.lab_items_code,
  lo.lab_items_name_ref,
  lo.lab_order_result
  FROM lab_order lo
  LEFT JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
  WHERE lo.lab_items_code IN('1628','1837','1839','1852','1854')
  ) lab ON ov.vn = lab.vn
  
  WHERE 
  #ov.vstdate BETWEEN @date1 AND @date2
    ov.vstdate = "${date}"
  AND lab.lab_items_code IS NOT NULL`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

//ค้นหาการตรวจ lab
router.get("/screenLabList/:cid", async (req, res) => {
  const { cid } = req.params;
  db2.query(
    `
  SELECT
    vstdate,
    hn,
    vn,
    fullname,
    sex,
    cid,
    age_y,
    pttype_name,nationality_name,
    cc,
    lab_order_result
    FROM covid_lab
    WHERE cid = "${cid}"
    ORDER BY vstdate DESC
  `,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

//ค้นหาการตรวจ lab ทั้งหมด
router.get("/screenLabList/", async (req, res) => {
  const { cid } = req.params;
  db2.query(
    `
  SELECT
    vstdate,
    hn,
    vn,
    fullname,
    sex,
    cid,
    age_y,
    pttype_name,nationality_name,
    cc,
    lab_order_result
    FROM covid_lab
    ORDER BY vstdate DESC
  `,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

//สรุปการตรวจ lab ทั้งหมด
router.get("/lab/", async (req, res) => {
  const { cid } = req.params;
  db2.query(
    `
  SELECT
  #lab_items_code,
  lab_items_name_ref AS lab_type,
  COUNT(lab_items_code) as total
  FROM covid_lab
  GROUP BY lab_items_name_ref
  ORDER BY lab_items_name_ref DESC
  `,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/sumScreen/:date", async (req, res) => {
  const { date } = req.params;
  db2.query(
    `
  SELECT
  o.vstdate,
  o.pttype,
  p.name,
  COUNT(o.vn) sum,
  o.main_dep

  FROM ovst o
  LEFT JOIN pttype p ON o.pttype = p.pttype
  WHERE o.vstdate = "${date}"
  AND o.main_dep = '073'
  GROUP BY o.pttype`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/covid", async (req, res) => {
  db2(
    `
  SELECT * FROM nhso_adp_code`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
});

module.exports = router;
