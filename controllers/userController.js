const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res)=> {
    const selectedUser = await  User.findOne({email: req.body.email})
    if(selectedUser) return res.status(400).send('email ja existente')


        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err) {
        res.status(400).send(err)
    }
}
const login = async (req, res)=>{
    const selectedUser = await  User.findOne({email: req.body.email})
    if(!selectedUser) return res.status(400).send('email icorreto')

    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
    if(!passwordAndUserMatch)return res.status(400).send('senha incorreto')

    const Secret = 'dasndi3n4354f3n'

    const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, Secret)

    res.header('authorization-token', token)
    res.send('User loged')
    }

module.exports = {
    register,
    login
}