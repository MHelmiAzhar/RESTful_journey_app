import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
  role: 'employee' | 'tourist'
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
  public password!: string
  public role!: 'employee' | 'tourist'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  static associate(models: any) {
    User.hasOne(models.Tourist, {
      foreignKey: 'user_id',
      as: 'tourist'
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
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('employee', 'tourist'),
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
