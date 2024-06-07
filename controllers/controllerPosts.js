const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSlug = require('../utils/getSlug.js');

const index = async (req, res) => {
    const where = {};
    try {
    
        const { published, title } = req.query;

        if (published) where.published = published === "true";

        if (title) where.title = { contains: title };
        
        const posts = await prisma.post.findMany({where});
        
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(404).json('Non trovato');
    }
}

const show = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: req.params.slug
            }
        })

        if (!post) {
            return res.status(404).json('non trovato');
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json('Errore server')
    }

}

const create = async (req, res) => {
    try {
        const { title, image, content, published } = req.body;
    
        const posts = await prisma.post.findMany();
    
        const data = {
            title,
            slug:createSlug(title, posts),
            image,
            content,
            published: Boolean(published)
    
        }

        const post = await prisma.post.create({ data });
        
        res.status(200).json(post)

    } catch (error) {
        res.status(400).json('Dati non inseriti correttamente')
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.update({
            where: {
                slug: slug,
            },
            data: req.body
        });

        res.status(200).json(post)

    } catch (error) {
        res.status(400).json('Dati non inseriti correttamente')
    }
}

const destroy = async (req, res) => {

    const { slug } = req.params;

    try {
        const post = await prisma.post.delete({
            where: {
                slug: slug
            }
        });

        res.status(200).json(`${post.title} eliminato con successo`)

    } catch (error) {
        res.status(404).json(`${slug} non trovato`)
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}