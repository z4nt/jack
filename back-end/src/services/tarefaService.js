const {Tarefas} = require('../models/tarefas.js')

const list = async (req) => { 
   const list = await Tarefas.findAll({where: {usuarioId: req}})
   return list
}

const listId = async (req) => {
    const list = await Tarefas.findByPk(req)
    return list
}

const create = async (req) => {
    await Tarefas.create(req)
}

const deletar = async (req) => {
    await Tarefas.destroy({where: {id: req}})
}

const update = async (id, data) => {
    
    const list = await Tarefas.update(data, {where: {id: id}})
    console.log("listaaaaaaaaaaaaaaaa:", list)
}

module.exports = {
    list,
    listId,
    create,
    deletar,
    update
}