const express = require("express");
const router = express.Router();
// const db1 = require('../db_config')
// const db2 = require('../db_config')
const mysql = require('mysql');



// Select Data
router.get('/service_points',(req,res) => {
    db2.query(`SELECT local_code,service_point_name,department_id,prefix FROM q4u_service_points`, function (error, results, fields) {
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

router.get('/cvalidate',(req,res) => {
  db2.query(`SELECT * FROM cvalidate`, function (error, results, fields) {
    try {
      res.json(results)
      
    } catch (error) {
      console.log(error)
    }  
  });
})

module.exports = router;