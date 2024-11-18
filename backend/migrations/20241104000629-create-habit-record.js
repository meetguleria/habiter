'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HabitRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      habit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Habits',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      // Remove foreign key constraint if it exists
      await queryInterface.removeConstraint('HabitRecords', 'HabitRecords_habit_id_fkey');
    } catch (err) {
      console.error('Warning: Could not remove HabitRecords_habit_id_fkey constraint:', err.message);
    }

    // Drop `HabitRecords` table
    try {
      await queryInterface.dropTable('HabitRecords');
    } catch (err) {
      console.error('Warning: Could not drop HabitRecords table:', err.message);
    }
  }
};
