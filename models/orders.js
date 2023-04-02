module.exports = (sequelize, DataTypes) => {

    const order = sequelize.define('orders',{

        orderid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        useremail:{
            type: DataTypes.STRING,
            allowNull : false
        },
        userinfo:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        items:{
            type : DataTypes.TEXT,
            allowNull : false
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    return order;









}











