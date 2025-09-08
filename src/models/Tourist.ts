import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface TouristAttributes {
  id?: number
  user_id: number
  address: string
  phone_number: string
  createdAt?: Date
  updatedAt?: Date
}

interface TouristCreationAttributes extends Optional<TouristAttributes, 'id'> {}

class Tourist
  extends Model<TouristAttributes, TouristCreationAttributes>
  implements TouristAttributes
{
  public id!: number
  public user_id!: number
  public address!: string
  public phone_number!: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  static associate(models: any) {
    Tourist.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
    Tourist.hasMany(models.Journey, {
      foreignKey: 'tourist_id',
      as: 'journeys'
    })
  }
}

Tourist.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    tableName: 'tourists',
    timestamps: true,
    modelName: 'Tourist'
  }
)

export default Tourist
