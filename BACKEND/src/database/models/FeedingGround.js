"use strict"
module.exports = (sequelize, DataTypes) => {
    const FeedingGround = sequelize.define('feedingGround', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        longitude: {
            type: DataTypes.DECIMAL(13,9)
        },
        lattitude: {
            type: DataTypes.DECIMAL(13,9)
        },
        notes: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },{
        timestamps: false,
        freezeTableName: true
    });

    FeedingGround.associate = function(models) {
        FeedingGround.hasMany(models.catch, {
            foreignKey: 'feedingGroundID',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        })
    }
    

    return FeedingGround;
}
