const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSlug = require('../utils/getSlug.js');

const index = async (req, res) => {
    const where = {};
    try {
    
        const { published, search } = req.query;

        if (published) where.published = published === "true";

        if (search) {
            where.OR = [
            {
                title: {
                contains: search.toLowerCase()
                }
            },
            {
                content: {
                contains: search.toLowerCase()
                }
            },  
        ]};
        
        const posts = await prisma.post.findMany({
            where,
            include: {
                tags: {
                    select: {
                        name:true
                    }
                },
                category: {
                    select: {
                        name:true
                    }
                }
            }
        });
        
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const show = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: req.params.slug
            },
            include: {
                tags: {
                    select: {
                        name:true
                    }
                },
                category: {
                    select: {
                        name:true
                    }
                }
            }
        })

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json('Errore server')
    }

}

const create = async (req, res) => {
    try {
        const { title, image, content, published, tags, categoryId } = req.body;
    
        const posts = await prisma.post.findMany();
    
        const data = {
            title,
            slug:createSlug(title, posts),
            image,
            content,
            published,
            tags: {
                connect : tags.map(id=> ({id}))
            }
    
        }

        if (categoryId) {
            data.categoryId = categoryId
        }

        const post = await prisma.post.create({
            data,
            include: {
            tags: {
                select: {
                    name:true
                }
            },
            category: {
                select: {
                    name:true
                }
            }
        }});
        
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;

        const { title, image, content, published, tags, categoryId } = req.body;
     
        const data = {
            title,
            image,
            content,
            published,
            tags: {
                set : tags.map(id=> ({id}))
            }
    
        }

        if (categoryId) {
            data.categoryId = categoryId
        }

        const post = await prisma.post.update({
            where: {
                slug: slug,
            },
            data,
            include: {
                tags: {
                    select: {
                        name:true
                    }
                },
                category: {
                    select: {
                        name:true
                    }
                }
            }

        });

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json('Errore server')
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