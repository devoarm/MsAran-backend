const express = require("express");
const router = express.Router();
const db1 = require('../config/db1')
const db2 = require('../config/db2')




// Select Data
router.get('/statment',(req,res) => {
    db2.query(`SELECT 
    i.hn,
    i.an,
    i.fullname,
    i.regdate,
    s.PROJCODE,
    i.income,
    s.compensate,
    s.TRAN_ID,
    s.rep,
    IF(s.TRAN_ID IS NOT NULL,1,3) as status
    FROM ipd i
    LEFT JOIN m_statements s ON i.an = s.an`, function (error, results, fields) {
      if (error) {
          console.log(error)
      } else {
          res.json(results)          
      }
        
    });
})

router.get('/ipd',(req,res) => {
  db2.query(`
  SELECT 
  i.hn,
  i.an,
  i.fullname,
  i.pttype,
  i.pttype_name,
  i.hipdata_code,
  i.regdate,
  s.PROJCODE,
  i.income,
  s.compensate,
  s.TRAN_ID,
  s.rep,
  IF(s.TRAN_ID IS NOT NULL,1,3) as status
  FROM ipd i
  LEFT JOIN m_statements s ON i.an = s.an
  WHERE i.hipdata_code = 'UCS'
  AND i.pttype NOT IN (35,40,41)`, function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        res.json(results)          
    }
      
  });
})

router.get('/sum_statment',(req,res) => {
  db2.query(`SELECT
  LEFT(m.rep,4) as mon,
  #m.PROJCODE,
  SUM(m.ipAdjRW) as t_AdjRW,
  SUM(m.compensate) as compensate
  FROM
  m_statements m
  #WHERE m.PROJCODE = 'ADSCOV'
  GROUP BY LEFT(m.rep,4)
  order by LEFT(m.rep,4)`, function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        res.json(results)          
    }
      
  });
})

router.get('/',(req,res) => {
   console.log(db2)
})


module.exports = router;