const Order = require("../models/Order");
const Shoe = require("../models/Shoe");
const Review = require("../models/Review");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
exports.getOrders = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;

    const orders = await Order.find({
      ...(req.query.orderId && { _id: req.query.orderId }),
      ...(req.query.productName && {
        products: { $eleMatch: { name: req.query.productName } },
      }),
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

      ...(req.query.status && { status: req.query.status }),
      ...(req.query.name && {
        $or: [
          {
            firstName: { $regex: req.query.name, $options: "i" },
            lastName: { $regex: req.query.name, $options: "i" },
          },
        ],
      }),
    })
      .sort({ createdAt: order })
      .skip(startIndex)
      .limit(limit);
    const totalProducts = await Order.find().countDocuments();
    const currentDate = new Date();
    const lastMonthData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const lastYearData = new Date(
        currentDate.getFullYear()-1,
        currentDate.getMonth() ,
        currentDate.getDate()
      );
  

    const lastYearTotalOrders = await Order.find({
      createdAt: { $gte: lastYearData },
    }).countDocuments();
    const todadayData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const lastMonthProducts = await Order.find({
      createdAt: { $gte: lastMonthData },
    });
    const currentMonthProducts = await Order.find({
      createdAt: { $gte: todadayData },
    });

    //12months data

    const formatDate = async (month, year) => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const order = await Order.find({
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

    // formatDate(2, 2024);
    //12month data

    res.status(200).json({
      orders,
      totalProducts,
      lastMonthProducts,
      currentMonthProducts,
      oneYearData,
      lastYearTotalOrders
    });
  } catch (error) {}
};

exports.getProducts = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;

    const shoe = await Shoe.find({
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
      ...(req.query.name && {
        $or: [
          {
            name: { $regex: req.query.name, $options: "i" },
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

    res.status(200).json({
      shoes: shoe,
      totalProducts,
      lastMonthProducts,
      currentMonthProducts,
      oneYearData,
    });
  } catch (error) {}
};
exports.getUsers = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6;
    const startIndex = req.query.startIndex || 0;
    const order = req.query.order === "asc" ? 1 : -1;

    const user = await User.find({
      ...(req.query.userId && { _id: req.query.userId }),
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
      ...(req.query.username && {
        $or: [
          {
            username: { $regex: req.query.username, $options: "i" },
          },
        ],
      }),
    })

      .sort({ createdAt: order })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.find().countDocuments();
    const currentDate = new Date();
    const lastMonthData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const currentMonthData = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );

    const todayUser = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const todayUsers = await User.find({ createdAt: { $gte: todayUser } });

    const lastMonthUsers = await User.find({
      createdAt: { $gte: lastMonthData },
    });
    const currentMonthUser = await User.find({
      createdAt: { $gte: currentMonthData },
    });

    const formatDate = async (month, year) => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      const order = await User.find({
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

    res.status(200).json({
      users: user,
      totalUsers,
      lastMonthUsers,
      currentMonthUser,
      todayUsers,
      oneYearData,
    });
  } catch (error) {}
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

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({ comments });
  } catch (error) {}
};
