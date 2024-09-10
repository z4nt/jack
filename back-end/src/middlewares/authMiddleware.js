const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authentication = (req,res,next)=>{
    const cabecalho = req.headers['authorization']
    console.log('cabecalho: ',cabecalho)
    const token = cabecalho && cabecalho.split('')[1]
    console.log('Token recebido:', token);
    if(token == undefined || null){
        return res.sendStatus(401)
    }

    jwt.verify(token,process.env.JWT, (err)=>{
        if(!err){
            res.send('token invalido')
        }  
        
    }) 
    next()
}

module.exports = { authentication }