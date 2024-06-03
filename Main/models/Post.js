const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100], // Ensure title is between 1 and 100 characters
      },
    },
    body: {
      type: DataTypes.TEXT, // Changed to TEXT to allow for longer content
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Anonymous', // Default value if author is not provided
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically set to current date and time
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
    hooks: {
      beforeUpdate: (post) => {
        post.updatedAt = new Date(); // Update the updatedAt field to current date and time
      },
    },
  }
);

module.exports = Post;
