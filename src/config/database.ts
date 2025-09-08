import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const {
  DB_NAME = 'data_cakra_dev',
  DB_USER = 'root',
  DB_PASS = '',
  DB_HOST = '127.0.0.1'
} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  timezone: '+00:00'
})

export default sequelize
