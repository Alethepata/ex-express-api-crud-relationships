const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
            errorMessage: "Il tag è un campo obbligatorio",
            bail:true
        },
        isArray: {
            errorMessage: "Il tag deve essere un'array",
            bail:true
        }
    }
}

module.exports = {
    data
}