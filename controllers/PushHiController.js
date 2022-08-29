const db1 = require("../config/db1");
const db2 = require("../config/db2");
const db = require('../models')

exports.PushHi = async (req, res) => {
  var dataSelect = [];
  // return console.log(5555)
  db2.query(
    `SELECT     
    o.vstdate,         
    o.vn,
    o.hn,
    CONCAT(pt.fname,' ',pt.lname) as fullname,
    pt.cid,
    pt.birthday,
    pt.sex,
    pt.addrpart,
    concat(pt.chwpart,pt.amppart,pt.tmbpart) as tmbpart,
    concat(pt.chwpart,pt.amppart) as amppart,
    pt.chwpart,
    p.pttype,
    p.name AS pttype_name,
    o.cur_dep,
    k.department,
    op.bw AS weight,
    op.height,
    op.bpd,
    op.bps,
    op.hr,
    op.pulse,
    op.temperature,
    op.rr
  FROM ovst o
    LEFT JOIN pttype p ON o.pttype = p.pttype
    LEFT JOIN kskdepartment k ON o.cur_dep = k.depcode
    LEFT JOIN patient pt ON o.hn = pt.hn
    LEFT JOIN opdscreen op ON o.vn = op.vn
  WHERE
    o.vstdate = CURDATE() AND
    o.cur_dep IN(075,076)
    #o.vstdate = '2022-03-25' AND
    #o.cur_dep = 075`
    , 
     async (err, rows) => {
      // return res.json({data: rows,row:rows.length});
      try {
        dataSelect = rows;                
        // await db.hi_profile.bulkCreate(dataSelect)      
        
        dataSelect.forEach(async (element)=>{        
          let hi = await db.hi_profile.findOne({ where: { vn: element.vn} });
          if (hi === null) {
            await db.hi_profile.create(element)
          } else {            
            await db.hi_profile.update({element}, {
              where: {
                vn: hi.vn
              }
            });
          }  
        })        
        return console.log("Ok")
        // return res.json({status: 200, rows:dataSelect.length,data:dataSelect});        
      } catch (error) {
        return console.log("NotOk")
        // res.json({status: 500,results: error});        
      }
        
    }
  );
};
exports.PushHiApi = async (req, res) => {
  var dataSelect = [];
  // return console.log(5555)
  db2.query(
    `SELECT     
    o.vstdate,         
    o.vn,
    o.hn,
    CONCAT(pt.fname,' ',pt.lname) as fullname,
    pt.cid,
    pt.birthday,
    pt.sex,
    pt.addrpart,
    concat(pt.chwpart,pt.amppart,pt.tmbpart) as tmbpart,
    concat(pt.chwpart,pt.amppart) as amppart,
    pt.chwpart,
    p.pttype,
    p.name AS pttype_name,
    o.cur_dep,
    k.department,
    op.bw AS weight,
    op.height,
    op.bpd,
    op.bps,
    op.hr,
    op.pulse,
    op.temperature,
    op.rr
  FROM ovst o
    LEFT JOIN pttype p ON o.pttype = p.pttype
    LEFT JOIN kskdepartment k ON o.cur_dep = k.depcode
    LEFT JOIN patient pt ON o.hn = pt.hn
    LEFT JOIN opdscreen op ON o.vn = op.vn
  WHERE
    o.vstdate = CURDATE() AND
    o.cur_dep IN(075,076)
    #o.vstdate = '2022-03-25' AND
    #o.cur_dep = 075`
    , 
     async (err, rows) => {
      // return res.json({data: rows});
      dataSelect = rows;                
      try {
        // await db.hi_profile.bulkCreate(dataSelect)              
        dataSelect.forEach(async (element)=>{        
          let hi = await db.hi_profile.findOne({ where: { vn: element.vn} });
          if (hi === null) {
            await db.hi_profile.create(element)
          } else {            
            await db.hi_profile.update({element}, {
              where: {
                vn: hi.vn
              }
            });
          }  
        })                
        return res.json({status: 200, rows:dataSelect.length,data:dataSelect,data: dataSelect});        
      } catch (error) {        
        return res.json({status: 500,results: error, rows : dataSelect});        
      }
        
    }
  );
};


