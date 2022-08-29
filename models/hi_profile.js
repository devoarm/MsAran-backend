'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hi_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hi_profile.init({
    vn: DataTypes.STRING,   
    hn: DataTypes.STRING,
    fullname: DataTypes.STRING,
    cid: DataTypes.STRING,
    birthday: DataTypes.DATE,   
    age:DataTypes.INTEGER,
    sex: DataTypes.STRING ,
    image: DataTypes.STRING,
    addrpart: DataTypes.STRING,
    tmbpart: DataTypes.STRING,
    amppart: DataTypes.STRING,
    chwpart: DataTypes.STRING,
    pttype: DataTypes.STRING,
    pttype_name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    cur_dep: DataTypes.STRING,
    department: DataTypes.STRING,
    weight: DataTypes.DOUBLE,
    height: DataTypes.DOUBLE,
    bp: DataTypes.DOUBLE,
    pr: DataTypes.DOUBLE,    
    bpd: DataTypes.DOUBLE,
    bps: DataTypes.DOUBLE,
    hr: DataTypes.STRING,
    pulse: DataTypes.DOUBLE,
    temperature: DataTypes.DOUBLE,
    rr: DataTypes.DOUBLE,
    vstdate: DataTypes.DATE,
    dcdate: DataTypes.DATE,
    hospcode: DataTypes.STRING,
    authen_number: DataTypes.STRING,
    line_id: DataTypes.STRING,
    department: DataTypes.STRING,    
    receive_sta: DataTypes.BLOB,    
    swabdate: DataTypes.DATE,   
    swabtype: DataTypes.STRING,    
    need_favi: DataTypes.BLOB, 
    stapdown: DataTypes.BLOB,
    need_paniculata: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'hi_profile',
  });
  return hi_profile;
};