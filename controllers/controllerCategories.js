const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res, next) => { 
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories)
    } catch (error) {
        next(error); 
    }
}

const show = async (req, res, next) => { 
    try {
        const category = await prisma.category.findUnique({
            where: {
                id : parseInt(req.params.id)
            }
        })
        res.status(200).json(category)
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
    
        const data = {
            name: name.trim()
        }

        const category = await prisma.category.create({ data });
        
        res.status(200).json(category)

    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => { 
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
        next(error);
    }
}

const destroy = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(`${category.name} eliminato con successo`)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}