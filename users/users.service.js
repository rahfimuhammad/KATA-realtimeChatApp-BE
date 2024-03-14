const prisma = require("../db")
const argon = require("argon2")

const createUser = async (userData) => {
    const newUserData = userData
    const hashedPassword = await argon.hash(newUserData.password)

    const user = await prisma.user.create({
        data: {
            id: newUserData.id,
            name: newUserData.name,
            email: newUserData.email,
            avatarURL: newUserData.avatarURL,
            password: hashedPassword,
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
    }
}

module.exports = {
    createUser,
}