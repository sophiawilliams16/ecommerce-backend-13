const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
    {
        tag_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tag',
            key: 'tag_id',
            }
        },
        product_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'product',
            key: 'product_id',
          }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "product_tag",
    }
);

module.exports = ProductTag;
