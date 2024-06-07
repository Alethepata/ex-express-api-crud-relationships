module.exports = (err, req, res, next) => {
    res.status(400).json({
        status: 400,
        error: `${err.meta.modelName} non trovato`
    })
}