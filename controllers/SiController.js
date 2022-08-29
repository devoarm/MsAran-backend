const db1 = require("../config/db1");
const db2 = require("../config/db2");
exports.si = async (req, res) => {
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
        WHERE hi_profiles.cur_dep = 076
        and hi_profiles.dcdate IS null
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
        WHERE hi_profiles.cur_dep = 076
        and hi_profiles.dcdate IS null
        and hi_profiles.hospcode = '${hospcode}'
            `,
            (err, rows) => {
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        ); 
    }       
};
exports.siSuccess = async (req, res) => {
    const {hospcode} = req.params;  
    if (hospcode == '0') {
        db1.query(`SELECT
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
        authen.type_audit
      FROM hi_profiles
        LEFT JOIN c_hospital ON  hi_profiles.hospcode = c_hospital.hoscode
        LEFT JOIN c_district ON  hi_profiles.amppart = c_district.ampurcodefull
        LEFT JOIN  c_subdistrict ON  hi_profiles.tmbpart = c_subdistrict.tamboncodefull
        LEFT JOIN c_province ON  hi_profiles.chwpart = c_province.changwatcode
        LEFT JOIN authen ON hi_profiles.cid = authen.cid
      WHERE hi_profiles.cur_dep = 076
      and hi_profiles.dcdate IS NOT null`,
        (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
        });   
    } else {
        db1.query(`SELECT
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
        authen.type_audit
      FROM hi_profiles
        LEFT JOIN c_hospital ON  hi_profiles.hospcode = c_hospital.hoscode
        LEFT JOIN c_district ON  hi_profiles.amppart = c_district.ampurcodefull
        LEFT JOIN  c_subdistrict ON  hi_profiles.tmbpart = c_subdistrict.tamboncodefull
        LEFT JOIN c_province ON  hi_profiles.chwpart = c_province.changwatcode
        LEFT JOIN authen ON hi_profiles.cid = authen.cid
      WHERE hi_profiles.cur_dep = 076
      AND hi_profiles.dcdate IS NOT null
			AND hi_profiles.hospcode = '${hospcode}'`,
            (err, rows) => {
                if (err) return res.json({ status: 500, msg: err });
                return res.json(rows);
            }
        ); 
    }       
};
exports.siNew = async (req, res) => {  
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
            hi_profiles.cur_dep = 076 and
            hi_profiles.hospcode IS NULL OR
            hi_profiles.hospcode = ''
        ORDER BY
            hi_profiles.vstdate DESC
        `,
            (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
            }
        ); 
    } else{
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
            hi_profiles.cur_dep = 076 and
            hi_profiles.hospcode IS NULL OR
            hi_profiles.hospcode = ''
        ORDER BY
            hi_profiles.vstdate DESC
        `,
            (err, rows) => {
            if (err) return res.json({ status: 500, msg: err });
            return res.json(rows);
            }
        ); 
    }
};
exports.siTenDay = async (req, res) => {  
    const {hospcode} = req.params;  
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
        hi_profiles.cur_dep = 076 and
        hi_profiles.hospcode IS NULL OR
        hi_profiles.hospcode = ''
    ORDER BY
        hi_profiles.vstdate DESC
    `,
        (err, rows) => {
        if (err) return res.json({ status: 500, msg: err });
        return res.json(rows);
        }
    ); 
};
