const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ribbon: {
      type: String,
      default: null,
    },
    photos: {
      type: Array,
      default: [],
    },
    sizes: {
      type: Array,
      default: [],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      default: [],
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    collect: {
      type: String,
      required: true,
    },
    heigh: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    onSalePercentage: {
      type: Number,
      default: null,
    },
    onSalePrice: {
      type: Number,
      default: null,
    },
    comments:{
      type:Array,
      default : []
    },
    ItemsQty : {
      type : Number,
      default :0
    }
    // reviews: [
    //   {
    //     userId: {
    //       type: String,
    //       required: true,
    //     },
    //     postId :{
    //         type : String,
    //         required : true,
    //     },
    //     stars: {
    //       type: Number,
    //       required: true,
    //     },
    //     headLine: {
    //       type: String,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //     },
    //     photo: {
    //       type: String,
    //     },
    //     isSubmit : {
    //       type : Boolean,
    //       default : false
    //     },
       
    //     createdAt: {
    //       type: Date,
    //       default: new Date().getTime(),
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

const shoe = mongoose.model("shoe", shoeSchema);
module.exports = shoe;
