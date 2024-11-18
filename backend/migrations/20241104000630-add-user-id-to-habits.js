'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Habits');
    if (!tableDescription.user_id) {
      await queryInterface.addColumn('Habits', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('Habits', 'user_id_fk');
    } catch (err) {
      console.error('Warning: Could not remove user_id_fk constraint:', err.message);
    }

    try {
      await queryInterface.removeColumn('Habits', 'user_id');
    } catch (err) {
      console.error('Warning: Could not remove user_id column:', err.message);
    }
  }
};
