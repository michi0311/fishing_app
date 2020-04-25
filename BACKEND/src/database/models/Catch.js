"use strict"
module.exports = (sequelize, DataTypes) => {
    const Catch = sequelize.define('catch', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        date: {
            type: DataTypes.DATEONLY(),
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        boilie: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        rig: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        temperature: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
        },
        weather: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        moon: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        watertemperature: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER(11),
            references: {
                 model: sequelize.models.user,
                 key: "ID",
            }
        },
        feedingGroundID: {
            type: DataTypes.INTEGER(11),
            references: {
                 model: sequelize.models.feedingGround,
                 key: "ID",
            }
        },
    },{
        timestamps: false,
        freezeTableName: true
    });

    Catch.associate = function(models) {
        Catch.hasOne(models.user, {
            foreignKey: 'id',
            sourceKey: 'userID',
            onDelete: 'CASCADE'
        }),
        Catch.hasOne(models.feedingGround, {
            foreignKey: 'id',
            sourceKey: 'feedingGroundID',
            onDelete: 'CASCADE'
        })
    }
    
    return Catch;
}
