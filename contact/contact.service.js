const prisma = require("../db")

const isContact = async (userId, recipientId) => {
    const contactEntry = await prisma.contacts.findFirst({
        where: {
            userId,
            recipientId
        }
    })

    return !!contactEntry
}

const addToContact = async (contactData) => {
    const newContactData = contactData;

    const check = await isContact(newContactData.userId, newContactData.recipientId)

    if(check) throw Error("Contact already exist")  
        
    const newContact = await prisma.contacts.create({
        data: {
            recipientId: newContactData.recipientId,
            userId: newContactData.userId,
        },
    });

        return newContact;
};

const getContact = async (userId) => {
    const contacts = await prisma.contacts.findMany({
        where: {
            userId: userId
        },
        include: {
            recipient: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarURL: true
                }
            }
        }
    })

    return contacts
}

const getProfile = async (userId) => {
    const profile = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatarURL: true
        }
    })
    return profile
}

module.exports = {
    isContact,
    addToContact,
    getContact
}