const bcrypt = require('bcrypt');

const hashCode = async(passwprd)=>{
    try{
        const saltround = 10;
        const hash = await bcrypt.hash(passwprd,saltround);
        return hash;
    }
    catch(error){
        console.log(error);
    }
}

const comparePassword = async(passwprd,hashCode)=>{
    return bcrypt.compare(passwprd,hashCode);
}

module.exports = {hashCode,comparePassword};