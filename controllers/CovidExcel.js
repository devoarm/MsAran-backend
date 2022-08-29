const db1 = require("../config/db1");
 
exports.patientCovid = async (req,res) =>{
    let sql = `SELECT
	h.vn, 
	h.hn, 
	h.fullname, 
	h.cid, 
	(YEAR(NOW()) - YEAR(h.birthday)) as old ,
	IF(h.sex = '1','ชาย','หญิง') as sex,
	p.name,
	h.mobile,
	h.addrpart, 
	cs.tambonname,
	cd.ampurname,
	cp.changwatname,
	h.department, 
	h.vstdate, 
	h.swabdate,
	h.swabtype,
	h.weight,
	h.height,
	h.bpd,
  h.bps,
  h.hr,
  h.pulse,
  h.temperature,
  h.rr,
	ch.hosname,
	IF(need_favi = 1,'favi','') as need_favi
FROM
	hi_profiles AS h
	LEFT JOIN c_province cp on h.chwpart = cp.changwatcode
	LEFT JOIN c_district cd on h.amppart = cd.ampurcodefull
	LEFT JOIN c_subdistrict cs ON h.tmbpart = cs.tamboncodefull
	LEFT JOIN c_hospital ch ON h.hospcode = ch.hoscode
	LEFT JOIN pttype p ON h.pttype = p.pttype`
    db1.query(sql,(err,result) =>{
        if(err) return res.json({status:500,msg:err.message});
        return res.json({status:200, result:result});
    })
}