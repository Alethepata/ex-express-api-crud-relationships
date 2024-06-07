module.exports = (err, req, res, next) => { 
    res.status(500).json({
        status: 500,
        error: 'Errore server'
    })
}