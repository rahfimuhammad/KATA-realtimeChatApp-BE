const express = require("express")

const router = express.Router()

const { addToContact, getContact, getProfile } = require("./contact.service")

router.post("/", async (req, res) => {
    try {
        const newContactData = req.body
        const contact = await addToContact(newContactData)

        res.status(201).send({
            data: contact,
            message: "added to contact"
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const contacts = await getContact(req.params.userId)
        res.status(200).send(contacts)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get("/profile/:userId", async (req, res) => {
    try {
        const profile = await getProfile(req.params.userId)
        res.status(200).send(profile)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router