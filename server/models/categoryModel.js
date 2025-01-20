const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:'string',
        require:true,
        unique:true,
    },
    slug:{
        type:'string',
        lowercase:true,
    }
})
module.exports = mongoose.model('category',categorySchema);