import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface JourneyAttributes {
  id: number
  user_id: number
  start_date: Date
  end_date: Date
  destination?: object | string | null
  createdAt?: Date
  updatedAt?: Date
}

interface JourneyCreationAttributes extends Optional<JourneyAttributes, 'id'> {}

class Journey
  extends Model<JourneyAttributes, JourneyCreationAttributes>
  implements JourneyAttributes
{
  public id!: number
  public user_id!: number
  public start_date!: Date
  public end_date!: Date
  public destination?: object | string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  static associate(models: any) {
    Journey.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
}

Journey.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    destination: { type: DataTypes.JSON, allowNull: true }
  },
  {
    sequelize,
    tableName: 'journeys',
    timestamps: true,
    modelName: 'Journey'
  }
)

export default Journey
