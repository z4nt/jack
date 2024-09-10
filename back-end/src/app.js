const express = require('express')
const app = express()
const sequelize = require('./config/database.js')
const sync = require('./config/sync.js')
const bodyParser = require('body-parser');
const RouterTarefa = require('./routes/tarefaRoutes.js')
const RouterUser = require('./routes/usuariosRoutes.js')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use('/task', RouterTarefa)       
app.use('/user', RouterUser)

app.listen(10000, () => {
    console.log('http://localhost:10000')
})