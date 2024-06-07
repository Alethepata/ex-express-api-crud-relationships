const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugParams = {
    slug: {
        in: ["params"],
        custom: {
            options: async (slug) => {
                const post = await prisma.post.findUnique({
                    where: {
                        slug
                    }
                })
                if (! isNaN(parseInt(slug))) {
                    throw new Error("Slug non valido")
                    }
                if (!post) {
                    throw new Error("Non trovato")
                }

            }
        }
    }
}

module.exports = {
    slugParams
}