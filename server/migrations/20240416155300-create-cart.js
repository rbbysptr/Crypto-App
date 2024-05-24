'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      supply: {
        type: Sequelize.STRING
      },
      maxSupply: {
        type: Sequelize.STRING
      },
      marketCapUsd: {
        type: Sequelize.STRING
      },
      volumeUsd24Hr: {
        type: Sequelize.STRING
      },
      priceUsd: {
        type: Sequelize.STRING
      },
      changePercent24Hr: {
        type: Sequelize.STRING
      },
      vwap24Hr: {
        type: Sequelize.STRING
      },
      explorer: {
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "cascade",
        onUppdate: "cascade"
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
    await queryInterface.dropTable('Carts');
  }
};