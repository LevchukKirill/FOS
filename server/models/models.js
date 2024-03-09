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

const Restaurant = sequelize.define('restaurants', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING, unique: true },
  address: { type: DataTypes.STRING },
});

const Food = sequelize.define('food', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const FoodInfo = sequelize.define('food_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, unique: true, allowNull: false },
});

Order.User = Order.belongsTo(User);
User.Orders = User.hasMany(Order);

Order.Foods = Order.belongsToMany(Food, { through: 'order_food' });
Food.Orders = Food.belongsToMany(Order, { through: 'order_food' });

Restaurant.Foods = Restaurant.hasMany(Food);
Food.Restaurant = Food.belongsTo(Restaurant);

FoodInfo.Food = FoodInfo.hasOne(Food, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
Food.FoodInfo = Food.belongsTo(FoodInfo, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Type.Foods = Type.hasMany(Food);
Food.Type = Food.belongsTo(Type);

module.exports = {
  User,
  Food,
  Order,
  FoodInfo,
  Type,
  Restaurant: Restaurant,
};
