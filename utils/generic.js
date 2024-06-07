const trimFunction = (name) => {
    return (value) => {
        if (value.trim() == "") {
            throw new Error( `${name} non valido`);
        }
        return true;  
    }
}

module.exports = {
    trimFunction
}