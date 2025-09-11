# RESTful Journey App

A RESTful API application built with Node.js, Express, TypeScript, and MySQL for managing user journeys and authentication.

## Features

- 🔐 **Authentication & Authorization** - JWT-based authentication with role-based access control
- 👥 **User Management** - User registration, login, and profile management
- 🚀 **Journey Management** - Create, read, update, and delete journey records
- 📚 **API Documentation** - Interactive Swagger/OpenAPI documentation
- 🧪 **Testing** - Comprehensive unit tests with Jest
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🗄️ **Database** - MySQL with Sequelize ORM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Testing**: Jest
- **API Documentation**: Swagger/OpenAPI
- **Environment Management**: dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MHelmiAzhar/RESTful_journey_app.git
   cd RESTful_journey_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

4. **Configure Environment Variables**

   Edit the `.env` file with your database and application settings:

   ```env
   # Database Configuration
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_HOST=localhost
   DB_DIALECT=mysql
   DB_PASS=your_database_password
   DB_PORT=3306

   # JWT Configuration
   JWT_SECRET=your_very_secret_jwt_key

   # Application Configuration
   PORT=3000
   NODE_ENV=development
   ```

5. **Database Setup**

   Create your MySQL database:

   ```sql
   CREATE DATABASE your_database_name;
   ```

6. **Run Database Migrations**

   ```bash
   npm run migrate
   ```

7. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot reloading enabled.

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## API Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Users

- `GET /api/user` - Get all users (Admin only)
- `GET /api/user/employees` - Get all employees (Admin only)

### Journeys

- `GET /api/journeys` - Get all journeys
- `POST /api/journeys` - Create a new journey
- `PUT /api/journeys/:id` - Update a journey
- `DELETE /api/journeys/:id` - Delete a journey

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
# Run specific test file
npx jest tests/service/userService.test.ts

# Run specific test file with coverage
npx jest tests/service/userService.test.ts --coverage
```

### Test Coverage per File

```bash
# Coverage for specific source file
npx jest --coverage --collectCoverageFrom="src/service/userService.ts"

# Coverage for specific test pattern
npx jest --coverage --testPathPattern="userService"
```

## Database Commands

### Migrations

```bash
# Run all pending migrations
npm run migrate

# Undo the last migration
npm run migrate:undo
```

### Seeders

```bash
# Run all seeders
npm run seed
```

## Project Structure

```
├── src/
│   ├── app.ts                  # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── common/
│   │   ├── exception/         # Custom error classes
│   │   └── helper/           # Utility functions
│   ├── config/
│   │   ├── config.js         # Database configuration
│   │   ├── database.ts       # Database connection
│   │   └── swagger.ts        # Swagger configuration
│   ├── controller/           # Route controllers
│   ├── docs/                 # API documentation
│   ├── middlewares/          # Express middlewares
│   ├── migrations/           # Database migrations
│   ├── models/              # Sequelize models
│   ├── repository/          # Data access layer
│   ├── routes/              # Route definitions
│   ├── seeders/             # Database seeders
│   └── service/             # Business logic layer
├── tests/                   # Test files
├── coverage/               # Test coverage reports
├── jest.config.js         # Jest configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Environment Variables

| Variable     | Description        | Default          |
| ------------ | ------------------ | ---------------- |
| `DB_NAME`    | Database name      | `data_cakra_dev` |
| `DB_USER`    | Database username  | `root`           |
| `DB_HOST`    | Database host      | `localhost`      |
| `DB_PASS`    | Database password  | `null`           |
| `DB_PORT`    | Database port      | `3306`           |
| `JWT_SECRET` | JWT signing secret | Required         |
| `PORT`       | Application port   | `3000`           |
| `NODE_ENV`   | Environment mode   | `development`    |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Scripts Reference

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build TypeScript to JavaScript           |
| `npm start`             | Start production server                  |
| `npm run migrate`       | Run database migrations                  |
| `npm run migrate:undo`  | Undo last migration                      |
| `npm run seed`          | Run database seeders                     |
| `npm test`              | Run all tests                            |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run test:verbose`  | Run tests with verbose output            |

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **Port Already in Use**

   - Change the `PORT` in `.env` file
   - Kill the process using the port: `lsof -ti:3000 | xargs kill`

3. **Migration Errors**

   - Ensure database exists
   - Check migration files for syntax errors
   - Verify database user has proper permissions

4. **JWT Secret Missing**
   - Add `JWT_SECRET` to your `.env` file
   - Use a strong, random string for production

## License

This project is licensed under the ISC License.

## Author

MHelmiAzhar

## Support

For support, please open an issue in the GitHub repository.
