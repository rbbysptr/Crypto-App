'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      supply: {
        allowNull: false,
        type: Sequelize.STRING
      },
      maxSupply: {
        type: Sequelize.STRING
      },
      marketCapUsd: {
        allowNull: false,
        type: Sequelize.STRING
      },
      volumeUsd24Hr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priceUsd: {
        allowNull: false,
        type: Sequelize.STRING
      },
      changePercent24Hr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vwap24Hr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      explorer: {
        allowNull: false,
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
    await queryInterface.dropTable('Coins');
  }
};
