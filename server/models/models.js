const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true },
  address: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const OrderFood = sequelize.define('order_food', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Restaurants = sequelize.define('restaurants', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, unique: true },
  address: { type: DataTypes.STRING },
});

const Food = sequelize.define('food', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type_id', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const FoodInfo = sequelize.define('food_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, unique: true, allowNull: false },
});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderFood);
Order.belongsTo(Order);

OrderFood.hasOne(Food);
Food.belongsTo(OrderFood);

Restaurants.hasMany(Food);
Food.belongsTo(Restaurants);

FoodInfo.hasOne(Food);
Food.belongsTo(FoodInfo);

Type.hasMany(Food);
Food.belongsTo(Type);

module.exports = {
  User,
  Food,
  Order,
  OrderFood,
  FoodInfo,
  Type,
  Restaurants,
};
