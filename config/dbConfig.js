require('dotenv').config()
module.exports = {
    host: process.env.HOST,
    db: process.env.DB,
    username: process.env.USERNAME,
    password:process.env.PASSWORD,
    dialect: "mysql"
  };
  