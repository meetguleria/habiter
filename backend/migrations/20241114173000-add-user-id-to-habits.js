'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if column 'user_id' exists before adding it
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
    await queryInterface.removeColumn('Habits', 'user_id');
  }
};
