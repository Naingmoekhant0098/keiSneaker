const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address1 : {
        type : String,
        required : true
    },
    address2 : {
        type : String,
         
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    zip : {
        type : Number,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    products : {
        type : Array,
        default : []
    },
    total  : {
        type : Number,
       default :0
    },
    
    status : {
        type : String,
        default : 'Pending'
    }
    
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
