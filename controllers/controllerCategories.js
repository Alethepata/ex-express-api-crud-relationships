const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => { 
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const show = async (req, res) => { 
    try {
        const category = await prisma.category.findUnique({
            where: {
                id : parseInt(req.params.id)
            }
        })
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json('Errore server')
    }
}

const create = async (req, res) => {
    try {
        const { name } = req.body;
    
        const data = {
            name: name.trim()
        }

        const category = await prisma.category.create({ data });
        
        res.status(200).json(category)

    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const update = async (req, res) => { 
    try {
        const { id } = req.params;

        const { name } = req.body;

        const data = {
            name: name.trim()
        }

        const category = await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const destroy = async (req, res) => { 
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(`${category.name} eliminato con successo`)
    } catch (error) {
        res.status(500).json('Errore server')
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}