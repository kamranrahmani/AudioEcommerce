require('dotenv').config()
module.exports = {
    host: process.env.HOST,
    db: process.env.DB,
    username: process.env.DB_USERNAME,
    password:process.env.PASSWORD,
    dialect: "mysql"
  };
  
