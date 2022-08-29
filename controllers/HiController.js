const db1 = require("../config/db1");
const db = require('../models')
exports.hi = async (req, res) => {
    const {hospcode} = req.params;  
    if (hospcode == '0') {
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
        hi_moon.hiv < 10 
        `,
        (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
        });   
    } else {
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
            hi_profiles.swabdate,
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
            hi_moon.hiv < 10 
        and hi_profiles.hospcode = '${hospcode}'
            `,
            (err, rows) => {
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        ); 
    }       
};
exports.hiSuccess = async (req, res) => {
    const {hospcode} = req.params;  
    if (hospcode == '0') {
        db1.query(`
        SELECT
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
	hi_profiles.pr, 
	DATE_FORMAT(hi_profiles.vstdate,'%d-%m-%Y') as vstdate,
	DATE_FORMAT(hi_profiles.dcdate,'%d-%m-%Y') as dcdate,
	c_hospital.hosname AS hospcode, 
	hi_profiles.authen_number, 
	hi_profiles.line_id,
	authen.claim_code,
	authen.authen_date,
	LEFT(authen.pttype_name ,5) AS pttype_authen,
	authen.type_audit,
	hi_moon.hiv
FROM hi_profiles
	LEFT JOIN c_hospital ON  hi_profiles.hospcode = c_hospital.hoscode
	LEFT JOIN c_district ON  hi_profiles.amppart = c_district.ampurcodefull
	LEFT JOIN  c_subdistrict ON  hi_profiles.tmbpart = c_subdistrict.tamboncodefull
	LEFT JOIN c_province ON  hi_profiles.chwpart = c_province.changwatcode
	LEFT JOIN authen ON hi_profiles.cid = authen.cid
	INNER JOIN (SELECT hi.id, DATE(NOW())-(DATE(hi.vstdate))  AS hiv FROM hi_profiles hi ) hi_moon ON hi_moon.id = hi_profiles.id
WHERE hi_profiles.cur_dep = 075 AND
	hi_moon.hiv > 10
        `,
        (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
        });   
    } else {
        db1.query(`
        SELECT
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
        hi_profiles.pr, 
        DATE_FORMAT(hi_profiles.vstdate,'%d-%m-%Y') as vstdate,
        DATE_FORMAT(hi_profiles.dcdate,'%d-%m-%Y') as dcdate,
        c_hospital.hosname AS hospcode, 
        hi_profiles.authen_number, 
        hi_profiles.line_id,
        authen.claim_code,
        authen.authen_date,
        LEFT(authen.pttype_name ,5) AS pttype_authen,
        authen.type_audit,
        hi_moon.hiv
    FROM hi_profiles
        LEFT JOIN c_hospital ON  hi_profiles.hospcode = c_hospital.hoscode
        LEFT JOIN c_district ON  hi_profiles.amppart = c_district.ampurcodefull
        LEFT JOIN  c_subdistrict ON  hi_profiles.tmbpart = c_subdistrict.tamboncodefull
        LEFT JOIN c_province ON  hi_profiles.chwpart = c_province.changwatcode
        LEFT JOIN authen ON hi_profiles.cid = authen.cid
        INNER JOIN (SELECT hi.id, DATE(NOW())-(DATE(hi.vstdate))  AS hiv FROM hi_profiles hi ) hi_moon ON hi_moon.id = hi_profiles.id
    WHERE hi_profiles.cur_dep = 075 AND
        hi_moon.hiv > 10
		AND hi_profiles.hospcode = '${hospcode}'`,
            (err, rows) => {
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        ); 
    }       
};
exports.hiNew = async (req, res) => {   
    const {hospcode} = req.params;  
    if (hospcode == '0') {
        db1.query(
            `SELECT
            hi_profiles.id, 
            hi_profiles.cid, 
            hi_profiles.fullname, 
            hi_profiles.sex, 
            hi_profiles.image, 
            hi_profiles.birthday, 
            pttype.name AS pttype_name, 
            hi_profiles.mobile, 
            hi_profiles.addrpart, 
            c_subdistrict.tambonname AS tmbpart, 
            c_district.ampurname AS amppart, 
            c_province.changwatname AS chwpart, 
            hi_profiles.swabdate,
            hi_profiles.swabtype,       
            hi_profiles.hospcode,     
            hi_profiles.need_favi, 
            hi_profiles.weight, 
            hi_profiles.height, 
            hi_profiles.bp, 
            hi_profiles.pr, 
            DATE_FORMAT(hi_profiles.vstdate,'%d-%m-%Y') AS vstdate
        FROM
            hi_profiles
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
            LEFT JOIN
            c_hospital
            ON 
                hi_profiles.hospcode = c_hospital.hoscode
        WHERE
            hi_profiles.hospcode IS NULL OR
            hi_profiles.hospcode = ''
        ORDER BY
            hi_profiles.vstdate DESC
        `,
            (err, rows) => {
            console.log(rows)
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
            }
        );       
    } else {
        db1.query(`SELECT
        h.id,
        h.vstdate,
        h.fullname,
        h.cid,
        h.mobile,
        h.hospcode,
        h.department,
        hi_profiles.swabdate,
        hi_profiles.swabtype,            
        hi_profiles.need_favi,  
        h.receive_sta
        FROM hi_profiles h
        WHERE hospcode = ${hospcode}
        #AND DATE(h.vstdate ) = CURRENT_DATE
        AND h.receive_sta is null`,
            (err, rows) => {
            console.log(rows)
              if (err) return res.json({ status: 500, msg: err });
              return res.json(rows);
            }
        );   
    }    
};
exports.confirmeHi = async (req, res) => {   
    const {id} = req.params;  
    db1.query(`UPDATE hi_profiles SET receive_sta = 1 WHERE id = ${id}`,(err, rows)=>{
        if (err) return res.json({ status: 500, msg: err})
        return res.json({ status:200,result: rows });
    })
};
exports.hiTenDay = async (req, res) => {  
    const {hospcode} = req.params;  
    if (hospcode == '0') {
        db1.query(`SELECT
        h.id,
        h.fullname, 
        h.cid, 
        (YEAR(NOW()) - YEAR(h.birthday)) as old ,
        IF(h.sex = '1','ชาย','หญิง') as sex,
        h.mobile,
        h.hospcode,
        h.swabdate,
        a.claim_code
        FROM hi_profiles h
        LEFT JOIN authen a ON h.cid = a.cid
        WHERE DATE_ADD(h.swabdate, INTERVAL 10 DAY) = CURRENT_DATE`,
            (err, rows) => {
            console.log(rows)
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
            }
        );       
    } else {
        db1.query(`SELECT
        h.id,
        h.fullname, 
        h.cid, 
        (YEAR(NOW()) - YEAR(h.birthday)) as old ,
        IF(h.sex = '1','ชาย','หญิง') as sex,
        h.mobile,
        h.swabdate,
        a.claim_code
        FROM hi_profiles h
        LEFT JOIN authen a ON h.cid = a.cid
        WHERE 
            DATE_ADD(h.swabdate, INTERVAL 10 DAY) = CURRENT_DATE AND
            h.hospcode = '${hospcode}'
        `,
            (err, rows) => {
                console.log(rows)
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        );   
    }  
};
exports.hiAll = async (req, res) => {
    const {hospcode} = req.params;  
    if (hospcode == '0') {
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
        hi_profiles.cur_dep = 075        
        `,
        (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
        });   
    } else {
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
            hi_profiles.swabdate,
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
            hi_profiles.hospcode = '${hospcode}'
            `,
            (err, rows) => {
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        ); 
    }       
};