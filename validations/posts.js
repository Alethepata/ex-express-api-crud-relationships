const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { trimFunction } = require('../utils/generic.js');

const data = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il titolo è un campo obbligatorio",
            bail:true
        },
        isString: {
            errorMessage: "Il titolo deve essere una stringa",
            bail:true
        },
        isLength: {
            errorMessage: "Il titolo deve avere un minimo di 3 e un massimo di 50 caratteri",
            options: { min: 3, max: 50 },
            bail:true
        },
        custom: {
            options: trimFunction("Titolo")
        }

    },
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il contenuto è un campo obbligatorio",
            bail:true
        },
        isString: {
            errorMessage: "Il contenuto deve essere una stringa",
            bail:true
        },
        isLength: {
            errorMessage: "Il contenuto deve avere un minimo di 3 e un massimo di 255 caratteri",
            options: { min: 3, max: 255 },
            bail:true
        },
        custom: {
            options: trimFunction("Contenuto")
        }
    },
    published: {
        in: ["body"],
        isBoolean: {
            errorMessage: "Questo campo può essere solo true o false",
            bail:true
        },
    },
    categoryId: {
        in: ["body"],
        isInt: {
            errorMessage: "Category Id deve essere numero intero",
            bail:true
        },
        custom: {
            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: {
                        id: categoryId
                    }
                })
                if (!category) {
                    throw new Error('Non esiste questa categoria');
                }
                return true;
            }
        }
    },
    tags: {
        in: ["body"],
        notEmpty: {
            errorMessage: "I tag sono dei campi obbligatorio",
            bail:true
        },
        isArray: {
            errorMessage: "I tag devono essere un'array",
            bail:true
        },
        isInt: {
            errorMessage: "I tag devono essere numeri interi",
            bail:true
        },
        custom: {
            options: async (value) => {
                if (value.length == 0) {
                    throw new Error('I tag sono dei campi obbligatorio'); 
                }
                const tags = await prisma.tag.findMany({
                    where: {
                        id: {in: value}
                    }
                })
                if (value.length !== tags.length) {
                    throw new Error('Uno o più tag inesistenti');
                }
                return true;
            }
        }
    }
}

module.exports = {
    data
}