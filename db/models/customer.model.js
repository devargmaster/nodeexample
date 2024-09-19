import { Model, DataTypes, Sequelize } from 'sequelize'; 
import { USER_TABLE } from './user.model.js';


const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER }, name: { allowNull: false, type: DataTypes.STRING, },
    lastName: { allowNull: false, type: DataTypes.STRING, field: 'last_name', }, phone: { allowNull: true, type: DataTypes.STRING, },
    createdAt: { allowNull: false, type: DataTypes.DATE, field: 'created_at', defaultValue: Sequelize.NOW, },
    userId: {
        field: 'user_id', allowNull: false, type: DataTypes.INTEGER, unique: true, references: { model: USER_TABLE, key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL'
    }
}
class Customer extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
    }
    static config(sequelize) {
        return {
            sequelize, tableName: CUSTOMER_TABLE, modelName: 'Customer', timestamps: false
        }
    }
}

export { Customer, CustomerSchema, CUSTOMER_TABLE };