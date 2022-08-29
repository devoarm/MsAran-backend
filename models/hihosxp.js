'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HiHosxp extends Model {
    static associate(models) {
      // define association here
    }
  }
  HiHosxp.init({
    vn: DataTypes.STRING,
    hn: DataTypes.STRING,
    fullname: DataTypes.STRING,
    cid: DataTypes.STRING,
    birthday: DataTypes.DATE,
    sex: DataTypes.STRING,
    addrpart: DataTypes.STRING,
    tmbpart: DataTypes.STRING,
    amppart: DataTypes.STRING,
    chwpart: DataTypes.STRING,
    pttype: DataTypes.STRING,
    pttype_name: DataTypes.STRING,
    cur_dep: DataTypes.STRING,
    department: DataTypes.STRING,
    weight: DataTypes.DOUBLE,
    height: DataTypes.DOUBLE,
    bpd: DataTypes.DOUBLE,
    bps: DataTypes.DOUBLE,
    hr: DataTypes.STRING,
    pulse: DataTypes.DOUBLE,
    temperature: DataTypes.DOUBLE,
    rr: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'HiHosxp',
  });
  return HiHosxp;
};