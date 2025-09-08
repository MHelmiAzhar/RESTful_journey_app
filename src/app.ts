import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './route/authRoute'
// import userRoutes from "./routes/userRoutes";
// import journeyRoutes from "./routes/journeyRoutes";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./docs/swagger"; // minimal swagger file (lihat nanti)

const app = express()
app.use(express.json())

// app.use('/', (req, res) => {
//   res.send('Welcome to the Data Cakra API')
// })
app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes) // employee-only routes
// app.use('/api/journeys', journeyRoutes)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

export default app
