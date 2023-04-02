module.exports = (sequelize, DataTypes) => {

    const product = sequelize.define('products',{

        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        slug:{
            type: DataTypes.STRING,
            allowNull: false
        },

        category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        features:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        isNew:{
            type: DataTypes.STRING,
            allow: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        items:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        images:{
            type:DataTypes.TEXT,
            allowNull:false
        }
    },
    {
        timestamps : false
    });
    
    return product
}