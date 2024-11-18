'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    static associate(models) {
      // Habit belongs to a user
      Habit.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE', // Remove multiple behaviors; keep it consistent
        onUpdate: 'CASCADE',
      });

      // Habit has multiple habit records (progress tracking)
      Habit.hasMany(models.HabitRecord, {
        foreignKey: 'habit_id',
        as: 'records',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Habit.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Habit',
  });

  return Habit;
};
