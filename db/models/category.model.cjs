const {Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createAt: {
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};
class Category extends Model {
    static associate(models) {
        this.hasMany(models.Product, { as:'products', foreignKey: 'categoryId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false,
        };
    }
}

module.exports = { Category, CategorySchema ,CATEGORY_TABLE};