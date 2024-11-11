'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vtype: {
        type: Sequelize.STRING
      },
      complain: {
        type: Sequelize.TEXT
      },
      contact: {
        type: Sequelize.STRING
      },
      location: {
    type: Sequelize.STRING, // Change from INTEGER to STRING
    allowNull: true, // Adjust based on your requirements
},
      problem: {
        type: Sequelize.TEXT
      },
      additional: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Posts');
  }
};