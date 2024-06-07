const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { trimFunction } = require('../utils/generic.js');

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

const dataName = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il nome è un campo obbligatorio",
            bail:true
        },
        isString: {
            errorMessage: "Il nome deve essere una stringa",
            bail:true
        },
        isLength: {
            errorMessage: "Il nome deve avere un minimo di 3 e un massimo di 50 caratteri",
            options: { min: 3, max: 50 },
            bail:true
        },
        custom: {
            options: trimFunction("Nome")
        }

    },
}

module.exports = {
    slugParams,
    dataName
}