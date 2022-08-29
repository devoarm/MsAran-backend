'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vn: {
        type: Sequelize.STRING
      },      
      hn: {
        type: Sequelize.STRING
      },      
      fullname: {
        type: Sequelize.STRING
      },      
      cid: {
        type: Sequelize.STRING
      },      
      birthday: {
        type: Sequelize.DATE
      }, 
      age:{
        type: Sequelize.INTEGER
      },           
      sex: {
        type: Sequelize.STRING
      },      
      image: {
        type: Sequelize.STRING
      },      
      addrpart: {
        type: Sequelize.STRING
      },      
      tmbpart: {
        type: Sequelize.STRING
      },      
      amppart: {
        type: Sequelize.STRING
      },      
      chwpart: {
        type: Sequelize.STRING
      },      
      pttype: {
        type: Sequelize.STRING
      },      
      pttype_name: {
        type: Sequelize.STRING
      },      
      mobile: {
        type: Sequelize.STRING
      },      
      cur_dep: {
        type: Sequelize.STRING
      },      
      department: {
        type: Sequelize.STRING
      },      
      weight: {
        type: Sequelize.DOUBLE
      },      
      height: {
        type: Sequelize.DOUBLE
      },      
      bp: {
        type: Sequelize.DOUBLE
      },      
      pr: {
        type: Sequelize.DOUBLE
      },      
      bpd: {
        type: Sequelize.DOUBLE
      },      
      bps: {
        type: Sequelize.DOUBLE
      },      
      hr: {
        type: Sequelize.STRING
      },
      pulse: {
        type: Sequelize.DOUBLE
      },   
      temperature: {
        type: Sequelize.DOUBLE
      },
      rr: {
        type: Sequelize.DOUBLE
      },   
      vstdate: {        
        type: Sequelize.DATE
      },
      dcdate: {        
        type: Sequelize.DATE
      },
      hospcode: {        
        type: Sequelize.STRING
      },
      authen_number: {        
        type: Sequelize.STRING
      },
      line_id: {        
        type: Sequelize.STRING
      },
      department: {        
        type: Sequelize.STRING
      },
      receive_sta: {        
        type: Sequelize.BLOB,
        defaultValue: '0'
      },
      swabtype: {        
        type: Sequelize.STRING
      },
      need_favi:{
        type:Sequelize.BLOB
      },
      stapdown:{
        type:Sequelize.BLOB
      },
      swabdate: {        
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hi_profiles');
  }
};