const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedP = await bcrypt.hash(password, salt)
        return hashedP; 
    } catch (error) {
        console.log(error)
    }
}    

const comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword, comparePassword
}