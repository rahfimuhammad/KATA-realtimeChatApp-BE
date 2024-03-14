const express = require("express")
const router = express.Router()

const { createUser } = require("./users.service")

router.post("/", async (req, res) => {
    try {
        const newUserData = req.body
        const user = await createUser(newUserData)

        res.send({
            data: user,
            message: "register success"
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router