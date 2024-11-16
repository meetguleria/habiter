'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the habit_id column in HabitRecords to reflect new cascade rules
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

    // Update the user_id column in Habits to reflect cascading rules
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
    // Revert habit_id changes in HabitRecords to remove cascade rules
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

    // Revert user_id changes in Habits to remove cascade rules
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
