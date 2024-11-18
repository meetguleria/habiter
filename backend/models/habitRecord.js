'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HabitRecord extends Model {
    static associate(models) {
      // HabitRecord belongs to a habit
      HabitRecord.belongsTo(models.Habit, {
        foreignKey: 'habit_id',
        as: 'habit',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  HabitRecord.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('default', 'success', 'failure'),
      defaultValue: 'default',
    },
    clickCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
