const express = require('express')
const userController = require('../controllers/usuariosController.js')
const authController = require('../controllers/authController')
const router = express.Router();
const auth = require('../middlewares/authMiddleware')

router.post('', userController.createUser)
router.get('/search', auth.authentication,userController.listUser)
router.get('/:id', auth.authentication,userController.listUserId)
router.put('/:id', auth.authentication, userController.updateUser)
router.delete('/:id', auth.authentication, userController.deleteUser)
router.post('/token', authController.login)

module.exports = router