"use strict"
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Password can\'t be empty' }
            },
        },
    },{
        timestamps: false,
        freezeTableName: true
    });

    User.associate = function(models) {
        User.hasMany(models.catch, {
            foreignKey: 'userID',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        })
    }
    

    return User;
}
