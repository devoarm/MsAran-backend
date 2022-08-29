'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HiHosxps', {
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
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      height: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      bp: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      pr: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      bpd: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      bps: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },      
      hr: {
        type: Sequelize.STRING
      },
      pulse: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },   
      temperature: {
        type: Sequelize.DOUBLE,
        defaultValue: null
      },
      rr: {
        type: Sequelize.DOUBLE,
        defaultValue: null
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
        type: Sequelize.BOOLEAN
      },
      swabtype: {        
        type: Sequelize.STRING
      },
      need_favi: {        
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('HiHosxps');
  }
};