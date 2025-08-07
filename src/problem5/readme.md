# Problem5 Application

A Node.js/Express application built with TypeScript, Prisma ORM, and various middleware for authentication and validation.

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **MySQL** database server
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd problem5
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

### Environment Variables

1. **Create a `.env` file** in the root directory of the project.

2. **Configure the following environment variables**:
   ```env
   # Database Configuration
   DATABASE_URL="mysql://root:@localhost:3306/crude"
   
   # JWT Configuration (add these if using JWT authentication)
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="24h"
   
   # Server Configuration
   PORT=3000
   NODE_ENV="development"
   ```

3. **Update the database connection**:
   - Replace `root:@localhost:3306/crude` with your actual MySQL credentials
   - Format: `mysql://username:password@host:port/database_name`
   - Example: `mysql://myuser:mypassword@localhost:3306/crude`

### Database Setup

1. **Create the MySQL database**:
   ```sql
   CREATE DATABASE crude;
   ```

2. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

3. **Run database migrations** (if schema exists):
   ```bash
   npx prisma db push
   ```
   
   Or if you have migration files:
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database** (if seed file exists):
   ```bash
   npx prisma db seed
   ```

## Running the Application

### Development Mode

To run the application in development mode with auto-restart on file changes:

```bash
npm run dev
```

This command uses `nodemon` to watch for changes in TypeScript and JSON files and automatically restarts the server.

### Production Mode

1. **Build the application** (if build script exists):
   ```bash
   npm run build
   ```

2. **Start the application**:
   ```bash
   npm start
   ```
   
   Or directly run:
   ```bash
   ts-node main.ts
   ```

## Available Scripts

- `npm run dev` - Start the development server with auto-reload
- `npm test` - Run tests (currently not configured)



## Key Dependencies

### Runtime Dependencies
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type-safe JavaScript
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **class-validator** - Input validation
- **class-transformer** - Object transformation
- **routing-controllers** - Decorator-based routing
- **typedi** - Dependency injection
- **cors** - Cross-origin resource sharing
- **helmet** - Security middleware
- **morgan** - HTTP request logger

### Development Dependencies
- **nodemon** - Development server with auto-reload
- **ts-node** - TypeScript execution environment

## API Documentation

The application uses `routing-controllers` for decorator-based routing. Check the controller files for available endpoints.

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure MySQL server is running
   - Verify database credentials in `.env`
   - Check if the database exists

2. **Port Already in Use**:
   - Change the PORT in `.env` file
   - Kill the process using the port: `lsof -ti:3000 | xargs kill -9`

3. **Prisma Client Not Generated**:
   ```bash
   npx prisma generate
   ```

4. **TypeScript Compilation Errors**:
   - Ensure all type dependencies are installed
   - Check `tsconfig.json` configuration

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT secrets in production
- Keep dependencies updated
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License (as specified in package.json)

## Support

For issues and questions, please check the project documentation or create an issue in the repository.