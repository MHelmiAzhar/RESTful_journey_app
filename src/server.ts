import app from './app'
import dotenv from 'dotenv'
import sequelize from './config/database'
dotenv.config()

const PORT = process.env.PORT || 3000

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('DB connected')
    app.listen(PORT, () => {
      console.log(`Server running http://localhost:${PORT}`)
      console.log(`Swagger: http://localhost:${PORT}/api-docs`)
    })
  } catch (err) {
    console.error('Failed to start:', err)
    process.exit(1)
  }
})()
