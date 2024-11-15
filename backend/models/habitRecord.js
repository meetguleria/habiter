'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HabitRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HabitRecord belongs to a habit
      HabitRecord.belongsTo(models.Habit, {
        foreignKey: 'habit_id',
        as: 'habit',
        onDelete: 'CASCADE',
      });
    }
  }

  HabitRecord.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    habit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'HabitRecord',
  });

  return HabitRecord;
};
