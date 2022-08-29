var express = require("express");
var router = express.Router();
var db1 = require("../config/db1");
/* GET users listing. */
router.post("/statement", function (req, res, next) {
  var data = req.body;
  try {
    db1.query(
      "INSERT INTO `MsAranhos`.`m_statements` (`rep`, `no`, `TRAN_ID`, `hn`, `an`, `pid`, `fullname`, `vsdate`, `dcdate`, `MAININSCL`, `PROJCODE`, `charge`, `ip_act`, `ipAdjRW`, `ip_PS`, `compe_percent`, `CCUF`, `AdjRW`, `pay_rate`, `salary`, `compensate_act_sa`, `op_in`, `compensate_s`, `compensate_t`, `HC`, `HCDRUG`, `AE`, `AEDRUG`, `AEINST`, `DMIS_compensate_s`, `DMIS_compensate_t`, `DMIS_DRUG`, `Palliative_care`, `DMISHD`, `PP`, `FS`, `compensate`) VALUES ?",
      [data],
      (err, result) => {
        if (err) return res.json({ status: 500, message: err,data: data });
        else return res.json({ status: 200, message: result });
      }
    );
  } catch (error) {
    res.send(error);
  }  
});
router.post("/reps", function (req, res, next) {
  var data = req.body;
  try {
    db1.query(
      "INSERT INTO `MsAranhos`.`reps` (`id`, `rep_no`, `No`, `tran_id`,`hn`,`an`,`pid`,`name`,`type`,`dateAdm`,`dateDsc`,`nhso`,`agency`,`from`,`error_code`,`master_fund`,`sub_fund`,`type_service`,`refer`,`pttype_right`,`right`,`CHK`,`pttype`,`sub_pttype`,`HREF`,`HCODE`,`HMAIN`,`PROV1`,`RG1`,`HMAIN2`,`PROV2`,`RG2`,`DMIS_HMAIN3`,`DA`,`PROJ`,`PA`,`DRG`,`RW`,`CA_TYPE`,`collect_ncdn`,`collect_cdn`,`collect_sum`,`collect_central`,`pay`,`rate_point`,`PS`,`CCUF`,`AdjRW_NHSO`,`AdjRW2`,`compensate`,`act`,`salary_perc`,`salary`,`salary_total`,`IPHC`,`OPHC`,`OPAE`,`IPNB`,`IPUC`,`IP3SSS`,`IP7SSS`,`CARAE`,`CAREF`,`CAREF_PUC`,`OPINST`,`INST`,`IPAEC`,`IPAER`,`IPINRGC`,`IPNRGR`,`IPINSPSN`,`IPPRCC`,`IPPRCC_PUB`,`IPBKK_INST`,`IP_ONTOP`,`CATARACT`,`CATARACT_OFF`,`CATARACT_HOS`,`CATINST`,`DMISRC`,`DMISRC_JOB`,`RCUHOSC`,`RCUHOSC_JOB`,`RCUHOSR`,`RCUHOSR_JOB`,`LLOP`,`LLRGC`,`LLRGR`,`LP`,`STROKE_STEMI_DRUG`,`DMIDML`,`PP`,`DMISHD`,`DMICNT`,`Paliative_Care`,`DRUG`,`Deny_HC`,`Deny_AE`,`Deny_INST`,`Deny_IP`,`Deny_DMIS`,`baserate_old`,`baserate_add`,`baserate_tatal`,`FS`,`VA` ,`Remark`) VALUES ?",
      [data],
      (err, result) => {
        if (err) return res.json({ status: 500, message: err,data: data });
        else return res.json({ status: 200, message: result });
      }
    );
  } catch (error) {
    res.send(error);
  }  
});
// router.post("/register", (req, res) => {
//   res.json(req.body)
// });

module.exports = router;
