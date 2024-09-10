const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Usuarios} = require('../models/usuarios')

const login = async (req, res) => {
    const dados = req.body
    const result = await Usuarios.findOne({ where: { email: dados.email, password: dados.password } })
    const dados2 = { id: result.id, email: result.email, password: result.password }
    if (result) {
        const token = jwt.sign(dados2, process.env.JWT, { expiresIn: '1h' })
        console.log(token)
        res.json(token)
    } else {
        console.log('Deu ruim no login')
    }  

}

module.exports = { login }