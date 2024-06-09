const User = require("../models/User");
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      user,
    });
  } catch (error) {}
};

exports.addWatchList = async (req, res) => {
  try {
    const isIn = await User.findOne({
      _id: req.body.userId,
      watchLists: { $in: [req.body.postId] },
    });
    
    if (isIn) {
      await User.updateOne(
        { _id: req.body.userId },
        { $pull: { watchLists: req.body.postId } }
      );
    } else {
      await User.updateOne(
        { _id: req.body.userId },
        { $push: { watchLists: req.body.postId } }
      );
    }
    const updateUser = await User.findOne({ _id: req.body.userId });
    const { password: pass, ...rest } = updateUser._doc;
    
    res.status(200).json({
      user : rest
    })
  } catch (error) {}
};
