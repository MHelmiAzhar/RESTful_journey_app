import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface UserAttributes {
  id: number
  name: string
  email: string
  address: string
  phone_number: string
  password: string
  role: 'employee' | 'tourist' | 'admin'
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'role'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public name!: string
  public email!: string
  public address!: string
  public phone_number!: string
  public password!: string
  public role!: 'employee' | 'tourist' | 'admin'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  static associate(models: any) {
    User.hasOne(models.Journey, {
      foreignKey: 'user_id',
      as: 'journey'
    })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('employee', 'tourist', 'admin'),
      allowNull: false,
      defaultValue: 'tourist'
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    modelName: 'User'
  }
)

export default User
