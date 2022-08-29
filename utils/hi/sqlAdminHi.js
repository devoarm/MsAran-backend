export function sqlAdminHi() {
    return `SELECT
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
WHERE hi_profiles.cur_dep = 075
and hi_profiles.dcdate IS null`
};