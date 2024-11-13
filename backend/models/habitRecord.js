'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HabitRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HabitRecord.init({
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    habit_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HabitRecord',
  });
  return HabitRecord;
};