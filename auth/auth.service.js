const argon = require("argon2")
const prisma = require("../db")

const login = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.body.id
        }
    })
    if(!user) return res.status(404).send({message: "user not found"})
    
    const match = await argon.verify(user.password, req.body.password)
    if(!match) return res.status(400).send({message: "Wrong password"})
    const id = user.id
    const name = user.name
    const email = user.email
    const avatarURL = user.avatarURL

    req.session.userId = user.userId
    res.status(200).send({id, name, email, avatarURL})
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).send({message: "Cannot logout"})
        res.status(200).send({message: "You are logout"})
    })
}

module.exports = {
    login,
    logout
}