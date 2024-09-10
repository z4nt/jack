const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Usuarios = require('../models/usuarios');
const {Tarefas} = require('../models/tarefas.js');

 
(async () => {
    try {
        await sequelize.sync({force: true});
        console.log('Tabelas sincronizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar as tabelas:', error);
    }
})();

module.export