const {DataTypes} = require('sequelize')
const sequelize = require('../config/database.js')
const {Usuarios} = require('./usuarios.js')
const Tarefas = sequelize.define('tarefas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TaskStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
    })
    
    module.exports = {Tarefas}