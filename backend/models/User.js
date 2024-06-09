const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type : String,
            required : true,
            unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true
    },
    birthday : {
        type :Date,
         default : null,
    },
    profile : {
        type :String,
        default : 'https://www.dexerto.com/cdn-cgi/image/width=828,quality=60,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/10/25/jujutsu-kaisen-yuji.jpeg'
    },
    watchLists : {
        type :Array,
        default :[]
    }
    ,
    isAdmin : {
        type : Boolean,
        default : false,
    }

},{timestamps : true});

const User = mongoose.model('user',userSchema);
module.exports = User;