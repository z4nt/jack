const service = require('../services/tarefaService')

const list =  async (req,res)=>{
    let list = await service.list(req.params.id)
    res.send(list)
}

const listId = async (req,res) => {
    const list = await service.listId(req.params.id)
    res.send(list)
}

const create = async (req,res) => {
    await service.create(req.body)
    res.status(201).send("deu bom")
}

const deletar = async (req,res) => {
    await service.deletar(req.params.id)
    res.send("deu bom")
}

const update = async (req, res) => {
    await service.update(req.params.id,req.body)
    console.log(req.query)
    console.log(req.body)
    console.log(req.params.id)
    res.status(201).send("deu bom" )
}



module.exports = {
    list,
    listId,
    create,
    deletar,
    update
}