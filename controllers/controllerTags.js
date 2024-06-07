const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { name } = req.body;
    
        const data = {
            name
        }

        const tag = await prisma.tag.create({ data });
        
        res.status(200).json(tag)

    } catch (error) {
        res.status(500).json('Errore server')
    }
}

module.exports = {
    create,
}