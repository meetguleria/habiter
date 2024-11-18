'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('HabitRecords', 'habit_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Habits',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('Habits', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('HabitRecords', 'habit_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Habits',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });

    await queryInterface.changeColumn('Habits', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
  },
};
