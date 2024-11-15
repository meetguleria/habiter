'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Habit belongs to a user
      Habit.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      });

      // Habit can have multiple habit records (progress tracking)
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
