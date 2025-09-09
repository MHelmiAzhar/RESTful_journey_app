import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface TouristAttributes {
  id?: number
  first_name: string
  last_name: string
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
  public first_name!: string
  public last_name!: string
  public address!: string
  public phone_number!: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  static associate(models: any) {
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
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
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
