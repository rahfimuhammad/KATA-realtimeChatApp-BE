const express = require("express")
const { login, logout } = require("./auth.service")

const router = express.Router()

router.post('/login', login)
router.delete('/logout', logout)

module.exports = router