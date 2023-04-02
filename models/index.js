const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.db,dbConfig.username,dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});


sequelize.authenticate().then(()=>{
    console.log(`connected to database`);
}
).catch((err)=>{
    console.log(`failed to connect to database`)
    }
)

const db = {}

db.orders = require('./orders')(sequelize,DataTypes);
db.products = require('./products')(sequelize,DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;



sequelize.sync({force:false}).then(()=>{
    console.log(`re-sync done`)
}
).catch((err)=>{
    console.log(`re-sync failed`)
}
)

module.exports = db;
