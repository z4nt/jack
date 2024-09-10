const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')
const  {Tarefas} = require('../models/tarefas.js')
const Usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true 
});
Usuarios.hasMany(Tarefas, {
    foreignKey: 'usuarioId', // Nome da chave estrangeira na tabela tarefas
    as: 'tarefas' // Alias para o relacionamento
});
Tarefas.belongsTo(Usuarios, {
    foreignKey: 'usuarioId', // Nome da chave estrangeira na tabela tarefas
    as: 'usuario' // Alias para o relacionamento
});
module.exports = {Usuarios}