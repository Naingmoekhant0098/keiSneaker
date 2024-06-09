const Order = require("../models/Order");
const { listenerCount } = require("../models/User");

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

    let todaySale = 0;

    currentMonthProducts.forEach((e) => {
      todaySale += e.total;
    });

    const currentYearData = new Date(currentDate.getFullYear());

    const EndYear = new Date(currentDate.getFullYear());
    const currentYearTotalOrders = await Order.find({
      createdAt: { $gte: currentYearData },
    }).countDocuments();

    const lastYearData = new Date(currentDate.getFullYear() - 1);
    const lastYearTotalOrders = await Order.find({
      createdAt: { $gte: lastYearData, $lte: EndYear },
    }).countDocuments();

    const totalSaleData = await Order.find();

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
    

    const Jan = await formatDate(1, currentDate.getFullYear());
    const Feb = await formatDate(2, currentDate.getFullYear());

    const Mar = await formatDate(3, currentDate.getFullYear());

    const Apr = await formatDate(4, currentDate.getFullYear());

    const May = await formatDate(5, currentDate.getFullYear());

    const Jun = await formatDate(6, currentDate.getFullYear());

    const Jul = await formatDate(7, currentDate.getFullYear());

    const Aug = await formatDate(8, currentDate.getFullYear());

    const Sep = await formatDate(9, currentDate.getFullYear());

    const Oct = await formatDate(10, currentDate.getFullYear());
    const Nov = await formatDate(11, currentDate.getFullYear());

    const Dec = await formatDate(12, currentDate.getFullYear());

    //last jan
    const lastJan = await formatDate(1, currentDate.getFullYear() - 1);

    const lastFeb = await formatDate(2, currentDate.getFullYear() - 1);

    const lastMar = await formatDate(3, currentDate.getFullYear() - 1);

    const lastApr = await formatDate(4, currentDate.getFullYear() - 1);

    const lastMay = await formatDate(5, currentDate.getFullYear() - 1);

    const lastJun = await formatDate(6, currentDate.getFullYear() - 1);

    const lastJul = await formatDate(7, currentDate.getFullYear() - 1);

    const lastAug = await formatDate(8, currentDate.getFullYear() - 1);

    const lastSep = await formatDate(9, currentDate.getFullYear() - 1);

    const lastOct = await formatDate(10, currentDate.getFullYear() - 1);
    const lastNov = await formatDate(11, currentDate.getFullYear() - 1);

    const lastDec = await formatDate(12, currentDate.getFullYear() - 1);

    let oneYearData = [
      {
        month: "Jan",
        counts: Jan,
        lastCounts: lastJan,
      },
      {
        month: "Feb",
        counts: Feb,
        lastCounts: lastFeb,
      },
      {
        month: "Mar",
        counts: Mar,
        lastCounts: lastMar,
      },
      {
        month: "Apr",
        counts: Apr,
        lastCounts: lastApr,
      },
      {
        month: "May",
        counts: May,
        lastCounts: lastMay,
      },
      {
        month: "Jun",
        counts: Jun,
        lastCounts: lastJun,
      },
      {
        month: "Jul",
        counts: Jul,
        lastCounts: lastJul,
      },
      {
        month: "Aug",
        counts: Aug,
        lastCounts: lastAug,
      },
      {
        month: "Sep",
        counts: Sep,
        lastCounts: lastSep,
      },
      {
        month: "Oct",
        counts: Oct,
        lastCounts: lastOct,
      },
      {
        month: "Nov",
        counts: Nov,
        lastCounts: lastNov,
      },
      {
        month: "Dec",
        counts: Dec,
        lastCounts: lastDec,
      },
    ];

    ///get user traff
    const pendingOrder = await Order.find({ status: "Pending" });
    const confirmed = await Order.find({ status: "Confirmed" });
    const Shipping = await Order.find({ status: "Shipping" });
    const delivered = await Order.find({ status: "Delivered" });

    const orderTraffic = [
      {
        name: "Pending Orders",
        value: pendingOrder.length,
        fill: "#3333FF",
      },
      {
        name: "Confirmed Orders",
        value: confirmed.length,
        fill: "#FF9933",
      },
      {
        name: "Shipped Orders",
        value: Shipping.length,
        fill: "#FF3333",
      },
      {
        name: "Delivered Orders",
        value: delivered.length,
        fill: "#00FF00",
      },
    ];

    res.status(200).json({
      orders,
      totalProducts,
      lastMonthProducts,
      currentMonthProducts,
      oneYearData,
      lastYearTotalOrders,
      currentYearTotalOrders,
      todaySale,
      totalSaleData,
      orderTraffic,
    });
  } catch (error) {}
};
exports.updateStatus = async (req, res, next) => {
  try {
    const ress = await Order.findByIdAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
      }
    );

    res.status(200).json({
      order: ress,
    });
  } catch (error) {
    console.log(error.message);
  }
};
