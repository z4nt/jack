const {Usuarios} = require('../models/usuarios')

const createUser = async (data) => {
    try {
        Usuarios.create(data)
    } catch (error) {
        console.log('usuarios não cadastrado: ' + error)
    }
}

const listUser = async () => {
    try {
        await Usuarios.sync()
        const userList = await Usuarios.findAll()
        return userList
    } catch (error) {
        console.log('erro ao listar usuarios: ' + error)
    }
}

const listUserId = async (id) => {
    try {
        await Usuarios.sync()
        const userList = await Usuarios.findByPk(parseInt(id))
        return userList
    } catch (error) {
        console.log('erro ao listar usuario: ' + error)
    }
}


const updateUser = async (id, data) => {
    try {
        await Usuarios.update(data, {
            where: { id: id }
        })

    } catch (error) {
        console.log('Erro ao atualizar usuario: ' + error)
    }
}

const deleteUser = async (data) => {
    try {
        const checkk = await Usuarios.destroy({
            where: { id: data }
        })
        if (checkk > 0) {
            console.log('Usuario deletado')
        } else {
            console.log('Usuario não encontrado')
        }
    } catch {
        console.log('Erro ao tentar deletar usuario')
    }
}



module.exports = {
    createUser,
    listUser,
    updateUser,
    deleteUser,
    listUserId
}