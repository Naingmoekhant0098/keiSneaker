const mongoose = require('mongoose');


const connect = async()=>{
    try {
       await mongoose.connect(process.env.mongoose_key)
        .then((res)=>console.log('Mongoose connected'))
        .catch((err)=>console.log(err.message))
    } catch (error) {
        console.log(error.message)
    }
}

connect();