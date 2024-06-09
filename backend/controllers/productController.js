const Shoe = require("../models/Shoe");
const Review = require("../models/Review");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const stripe = require("stripe")(
  "sk_test_51PMiKq056niaF0Ixmw7EY4lvLgEpjI5S72dhItILqADqld7IotJJb9DO5hAXM3Kq6JzjHEH5ttoLQn8ivcNtLcsm00Jljz8dkq"
);
const Order = require("../models/Order");
exports.addProduct = async (req, res, next) => {
  const slug = req.body.name
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");
  const beforeSave = new Shoe({
    name: req.body.name,
    code: req.body.code,
    price: req.body.price,
    short_description: req.body.short_description,
    description: req.body.description,
    brand: req.body.brand,
    collect: req.body.collection,
    activity: req.body.activity,
    colors: req.body.colors,
    sizes: req.body.sizes,
    heigh: req.body.heigh,
    photos: req.body.images,
    category: req.body.category,
    ribbon: req.body.ribbon,
    slug: slug,
    ItemsQty: req.body.itemsQty,
  });
  try {
    const product = await beforeSave.save();

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;

    const shoe = await Shoe.find({
      ...(req.query.productId && { _id: req.query.productId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.brands && { brand: { $in: req.query.brands.split(",") } }),
      ...(req.query.category && {
        category: { $in: req.query.category.split(",") } || "unisex",
      }),
      ...(req.query.activity && { activity: req.query.activity }),
      ...(req.query.collect && {
        collect: { $in: req.qureq.query.colorery.collection.split(",") },
      }),
      ...(req.query.heigh && { heigh: req.query.heigh }),
      ...(req.query.prices && {
        price: {
          $gte: req.query.prices.split("-")[0],
          $lte: req.query.prices.split("-")[1],
        },
      }),
      ...(req.query.colors && { colors: { $in: req.query.colors.split(",") } }),
      ...(req.query.sizes && { sizes: { $in: req.query.sizes.split(",") } }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.date && {
        createdAt: {
          $gte: new Date(
            new Date(req.query.date).getFullYear(),
            new Date(req.query.date).getMonth(),
            new Date(req.query.date).getDate()
          ),
          $lte: new Date(
            new Date(req.query.date).getFullYear(),
            new Date(req.query.date).getMonth(),
            new Date(req.query.date).getDate() + 1
          ),
        },
      }),
      ...(req.query.searchTerm && {
        $or: [
          {
            name: { $regex: req.query.searchTerm, $options: "i" },
          },
        ],
      }),
    })
      .sort({ createdAt: order })
      .skip(startIndex)
      .limit(limit);
    const totalProducts = await Shoe.find().countDocuments();
    const currentDate = new Date();
    const lastMonthData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const currentMonthData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const lastMonthProducts = await Shoe.find({
      createdAt: { $gte: lastMonthData },
    });
    const currentMonthProducts = await Shoe.find({
      createdAt: { $gte: currentMonthData },
    });
    const formatDate = async (month, year) => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const order = await Shoe.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      }).countDocuments();

      return order;
    };

    const Jan = await formatDate(1, 2024);
    const Feb = await formatDate(2, 2024);

    const Mar = await formatDate(3, 2024);

    const Apr = await formatDate(4, 2024);

    const May = await formatDate(5, 2024);

    const Jun = await formatDate(6, 2024);

    const Jul = await formatDate(7, 2024);

    const Aug = await formatDate(8, 2024);

    const Sep = await formatDate(9, 2024);

    const Oct = await formatDate(10, 2024);
    const Nov = await formatDate(11, 2024);

    const Dec = await formatDate(12, 2024);

    let oneYearData = [
      {
        month: "Jan",
        counts: Jan,
      },
      {
        month: "Feb",
        counts: Feb,
      },
      {
        month: "Mar",
        counts: Mar,
      },
      {
        month: "Apr",
        counts: Apr,
      },
      {
        month: "May",
        counts: May,
      },
      {
        month: "Jun",
        counts: Jun,
      },
      {
        month: "Jul",
        counts: Jul,
      },
      {
        month: "Aug",
        counts: Aug,
      },
      {
        month: "Sep",
        counts: Sep,
      },
      {
        month: "Oct",
        counts: Oct,
      },
      {
        month: "Nov",
        counts: Nov,
      },
      {
        month: "Dec",
        counts: Dec,
      },
    ];
    const allProduct = await Shoe.find()

    
    let todaySale = 0;

    allProduct.forEach((e) => {
      todaySale += (e.ItemsQty * e.price);
    });

    res.status(200).json({
      shoes: shoe,
      totalProducts,
      lastMonthProducts,
      currentMonthProducts,
      oneYearData,
      todaySale
    });
  } catch (error) {}
};

exports.addDiscount = async (req, res, next) => {
  try {
    if (!req.body.discount || !req.body.discountPrice) {
      res.status(500).json("Filll all required field");
    }
    const shoe = await Shoe.findByIdAndUpdate(
      { _id: req.body.id },
      {
        isOnSale: true,

        onSalePercentage: req.body.discount,
        onSalePrice: req.body.discountPrice,
      }
    );

    res.status(200).json({
      shoe,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const shoe = await Shoe.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      shoe,
    });
  } catch (error) {}
};

exports.stockProduct = async (req, res, next) => {
  try {
    const shoe = await Shoe.findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: req.query.status,
      }
    );

    res.status(200).json({
      shoe,
    });
  } catch (error) {}
};

exports.editProduct = async (req, res, next) => {
  try {
    const slug = req.body.name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-");
    const product = await Shoe.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          code: req.body.code,
          price: req.body.price,
          short_description: req.body.short_description,
          description: req.body.description,
          brand: req.body.brand,
          collect: req.body.collection,
          activity: req.body.activity,
          colors: req.body.colors,
          sizes: req.body.sizes,
          heigh: req.body.heigh,
          photos: req.body.images,
          category: req.body.category,
          ribbon: req.body.ribbon,
          slug: slug,
        },
      }
    );

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    // const ress = await Shoe.updateOne(
    //   { _id: req.body.postId },
    //   {
    //     $push: { reviews: req.body },
    //   }
    // );
    const reviewBefore = new Review(req.body);
    const review = await reviewBefore.save();

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;

    const reviews = await Review.find({
      ...(req.query.postId && { postId: req.query.postId }),
      ...(req.query.id && { _id: req.query.id }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.isSubmit && { isSubmit: req.query.isSubmit }),
      ...(req.query.comment && {
        $or: [
          {
            comment: { $regex: req.query.comment, $options: "i" },
          },
        ],
      }),
    })
      .sort({ createdAt: order })
      .skip(startIndex)
      .limit(limit);
    const totalProducts = await Review.find().countDocuments();
    const five = await Review.find({
      postId: req.query.postId,
      isSubmit: "submited",
      stars: 5,
    }).countDocuments();
    const four = await Review.find({
      postId: req.query.postId,
      isSubmit: "submited",
      stars: 4,
    }).countDocuments();
    const three = await Review.find({
      postId: req.query.postId,
      isSubmit: "submited",
      stars: 3,
    }).countDocuments();
    const two = await Review.find({
      postId: req.query.postId,
      isSubmit: "submited",
      stars: 2,
    }).countDocuments();
    const one = await Review.find({
      postId: req.query.postId,
      isSubmit: "submited",
      stars: 1,
    }).countDocuments();

    res
      .status(200)
      .json({ reviews, five, four, three, two, one, totalProducts });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const ress = await Review.findByIdAndUpdate(
      { _id: req.body.id },
      {
        isSubmit: req.body.status,
      }
    );

    res.status(200).json({
      review: ress,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.unLikeReview = async (req, res, next) => {
  try {
    const isunLiked = await Review.find({
      _id: req.body.reviewId,
      unLikes: { $in: [req.body.userId] },
    });
    const isLiked = await Review.find({
      _id: req.body.reviewId,
      likes: { $in: [req.body.userId] },
    });
    if (isLiked.length > 0) {
      await Review.updateOne(
        { _id: req.body.reviewId },
        { $pullAll: { likes: [req.body.userId] } }
      );
    }

    if (isunLiked.length > 0) {
      await Review.updateOne(
        { _id: req.body.reviewId },
        { $pull: { unLikes: req.body.userId } }
      );
    } else {
      await Review.updateOne(
        { _id: req.body.reviewId },
        {
          $push: { unLikes: req.body.userId },
        }
      );
    }
    const review = await Review.findOne({ _id: req.body.reviewId });
    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};
exports.likeReview = async (req, res, next) => {
  try {
    const isUnLiked = await Review.findOne({
      _id: req.body.reviewId,
      unLikes: { $in: [req.body.userId] },
    });

    if (isUnLiked) {
      await Review.updateOne(
        { _id: req.body.reviewId },
        { $pullAll: { unLikes: [req.body.userId] } }
      );
    }

    const isLiked = await Review.find({
      _id: req.body.reviewId,
      likes: { $in: [req.body.userId] },
    });

    if (isLiked.length > 0) {
      await Review.updateOne(
        { _id: req.body.reviewId },
        { $pull: { likes: req.body.userId } }
      );
    } else {
      await Review.updateOne(
        { _id: req.body.reviewId },
        {
          $push: { likes: req.body.userId },
        }
      );
    }

    const review = await Review.findOne({ _id: req.body.reviewId });

    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};
exports.addComment = async (req, res, next) => {
  try {
    const SaveComment = new Comment({
      userId: req.body.userId,
      postId: req.body.postId,
      comment: req.body.comment,
    });
    const comment = await SaveComment.save();

    const ress = await Shoe.updateOne(
      { _id: req.body.postId },
      {
        $push: { comments: comment._id },
      }
    );

    res.status(200).json({ comment });
  } catch (error) {}
};
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ comments });
  } catch (error) {}
};
exports.unLikeComment = async (req, res, next) => {
  try {
    const isUnLiked = await Comment.findOne({
      _id: req.body.commentId,
      unLikes: { $in: [req.body.userId] },
    });
    const isLiked = await Comment.find({
      _id: req.body.commentId,
      likes: { $in: [req.body.userId] },
    });

    if (isLiked.length > 0) {
      await Comment.updateOne(
        { _id: req.body.commentId },
        { $pullAll: { likes: [req.body.userId] } }
      );
    }

    if (isUnLiked) {
      await Comment.updateOne(
        { _id: req.body.commentId },
        { $pull: { unLikes: req.body.userId } }
      );
    } else {
      await Comment.updateOne(
        { _id: req.body.commentId },
        {
          $push: { unLikes: req.body.userId },
        }
      );
    }

    const review = await Comment.findOne({ _id: req.body.commentId });

    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const isUnLiked = await Comment.findOne({
      _id: req.body.commentId,
      unLikes: { $in: [req.body.userId] },
    });

    if (isUnLiked) {
      await Comment.updateOne(
        { _id: req.body.commentId },
        { $pullAll: { unLikes: [req.body.userId] } }
      );
    }

    const isLiked = await Comment.find({
      _id: req.body.commentId,
      likes: { $in: [req.body.userId] },
    });

    if (isLiked.length > 0) {
      await Comment.updateOne(
        { _id: req.body.commentId },
        { $pull: { likes: req.body.userId } }
      );
    } else {
      await Comment.updateOne(
        { _id: req.body.commentId },
        {
          $push: { likes: req.body.userId },
        }
      );
    }

    const review = await Comment.findOne({ _id: req.body.commentId });

    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ comment });
  } catch (error) {}
};
exports.editComment = async (req, res, next) => {
  try {
    const editComment = await Comment.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          comment: req.body.editText,
        },
      }
    );

    res.status(200).json({ editComment });
  } catch (error) {}
};
exports.addReply = async (req, res, next) => {
  try {
    const reply = new Reply({
      commentId: req.body.id,
      userId: req.body.userId,
      reply: req.body.reply,
    });
    const saveReply = await reply.save();
    await Comment.updateOne(
      { _id: req.body.id },
      {
        $push: { replies: saveReply._id },
      }
    );

    const comment = await Comment.findOne({ _id: req.body.id });

    res.status(200).json({ comment: comment });
  } catch (error) {}
};

exports.getReply = async (req, res, next) => {
  try {
    const reply = await Reply.findById({ _id: req.params.id });

    res.status(200).json({ reply });
  } catch (error) {}
};

exports.likeReply = async (req, res, next) => {
  try {
    const isUnLiked = await Reply.findOne({
      _id: req.body.commentId,
      unLikes: { $in: [req.body.userId] },
    });

    if (isUnLiked) {
      await Reply.updateOne(
        { _id: req.body.commentId },
        { $pullAll: { unLikes: [req.body.userId] } }
      );
    }

    const isLiked = await Reply.find({
      _id: req.body.commentId,
      likes: { $in: [req.body.userId] },
    });

    if (isLiked.length > 0) {
      await Reply.updateOne(
        { _id: req.body.commentId },
        { $pull: { likes: req.body.userId } }
      );
    } else {
      await Reply.updateOne(
        { _id: req.body.commentId },
        {
          $push: { likes: req.body.userId },
        }
      );
    }

    const review = await Reply.findOne({ _id: req.body.commentId });

    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};

exports.unLikeReply = async (req, res, next) => {
  try {
    const isUnLiked = await Reply.findOne({
      _id: req.body.commentId,
      unLikes: { $in: [req.body.userId] },
    });
    const isLiked = await Reply.find({
      _id: req.body.commentId,
      likes: { $in: [req.body.userId] },
    });

    if (isLiked.length > 0) {
      await Reply.updateOne(
        { _id: req.body.commentId },
        { $pullAll: { likes: [req.body.userId] } }
      );
    }

    if (isUnLiked) {
      await Reply.updateOne(
        { _id: req.body.commentId },
        { $pull: { unLikes: req.body.userId } }
      );
    } else {
      await Reply.updateOne(
        { _id: req.body.commentId },
        {
          $push: { unLikes: req.body.userId },
        }
      );
    }

    const review = await Reply.findOne({ _id: req.body.commentId });

    res.status(200).json({ review });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteReply = async (req, res, next) => {
  try {
    await Reply.findByIdAndDelete({ _id: req.params.id });

    const comment = await Comment.findOne({ _id: req.query.commentId });
    const isIs = comment.replies.indexOf(req.params.id);

    if (isIs !== -1) {
      comment.replies.splice(req.params.id);
    }
    const save = await comment.save();

    res.status(200).json({
      comment: save,
    });
  } catch (error) {}
};

exports.editReply = async (req, res, next) => {
  try {
    const ress = await Reply.findByIdAndUpdate(
      { _id: req.body.replyId },
      {
        reply: req.body.text,
      }
    );
    res.status(200).json({
      ress,
    });
  } catch (error) {}
};

exports.checkoutSec = async (req, res, next) => {
  const { product, data, total } = req.body;

  const lineItem = product.map((prod) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: prod.name,
        images: [prod.photo],
      },
      unit_amount: prod.price * 100,
    },
    quantity: prod.qty,
    // tax_rates : [tax_rate.id]
  }));

  product.forEach(async (element) => {
    await Shoe.findByIdAndUpdate(
      { _id: element._id },
      {
        $inc: { ItemsQty: -element.qty },
      }
    );
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItem,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancle",
  });

  const order = new Order({
    firstName: data?.firstName,
    lastName: data.lastName,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    state: data.state,
    zip: data.zip,
    phone: data.phone,
    email: data.email,
    products: product,
    total: total,
  });

  if (session.id) {
    const saveOrder = await order.save();
    res.status(200).json({
      id: session.id,
      order: saveOrder,
    });
  }
};
