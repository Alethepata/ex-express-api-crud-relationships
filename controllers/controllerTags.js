const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res, next) => { 
    try {
        const tags = await prisma.tag.findMany();
        res.status(200).json(tags)
    } catch (error) {
        next(error);
    }
}

const show = async (req, res, next) => { 
    try {
        const tag = await prisma.tag.findUnique({
            where: {
                id : parseInt(req.params.id)
            }
        })
        res.status(200).json(tag)
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

        const tag = await prisma.tag.create({ data });
        
        res.status(200).json(tag)

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

        const tag = await prisma.tag.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        res.status(200).json(tag)
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const tag = await prisma.tag.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(`${tag.name} eliminato con successo`)
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