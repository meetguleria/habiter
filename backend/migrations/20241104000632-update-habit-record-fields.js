'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a new column with ENUM type
    await queryInterface.addColumn('HabitRecords', 'status_new', {
      type: Sequelize.ENUM('not_done', 'done', 'missed'),
      allowNull: false,
      defaultValue: 'not_done',
    });

    // Migrate existing data to the new column, with proper casting
    await queryInterface.sequelize.query(`
      UPDATE "HabitRecords"
      SET "status_new" = CASE
        WHEN "status" = true THEN 'done'::"enum_HabitRecords_status_new"
        WHEN "status" = false THEN 'not_done'::"enum_HabitRecords_status_new"
        ELSE 'not_done'::"enum_HabitRecords_status_new" -- fallback value
      END
    `);

    // Drop the old status column
    await queryInterface.removeColumn('HabitRecords', 'status');

    // Rename the new column to status
    await queryInterface.renameColumn('HabitRecords', 'status_new', 'status');
  },

  async down(queryInterface, Sequelize) {
    // Add back the old BOOLEAN column
    await queryInterface.addColumn('HabitRecords', 'status_old', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // Migrate existing data to the old column
    await queryInterface.sequelize.query(`
      UPDATE "HabitRecords"
      SET "status_old" = CASE
        WHEN "status" = 'done' THEN true
        WHEN "status" = 'not_done' THEN false
        ELSE false -- fallback value
      END
    `);

    // Drop the ENUM column
    await queryInterface.removeColumn('HabitRecords', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_HabitRecords_status";');

    // Rename the old column to status
    await queryInterface.renameColumn('HabitRecords', 'status_old', 'status');
  }
};
