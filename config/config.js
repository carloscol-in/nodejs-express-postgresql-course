require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DBUSER,
  dbName: process.env.DBNAME,
  dbPassword: process.env.DBPASSWORD,
  dbPort: process.env.DBPORT,
  dbHost: process.env.DBHOST,
}

module.exports = { config }
