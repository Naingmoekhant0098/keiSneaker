const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
exports.signUp = async (req, res, next) => {
  const sandPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    username: req.body.firstName + " " + req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    password: sandPassword,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.jwt_token,
      {
        expiresIn: "30d",
      }
    );

    const { password: pass, ...rest } = savedUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        user: { ...rest, token: token },
      });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signIn = async (req, res) => {
 
  try {
    const isUser = await User.findOne({ email: req.body.email });
  
    if (!isUser) {
      res.status(404).json("User Not found");
    }
    const isMatch = bcrypt.compareSync(req.body.password, isUser.password);
     
    if (!isMatch) {
      res.status(404).json("Password is not matched");
    }

    if (isUser && isMatch) {
      const token = jwt.sign(
        { id: isUser._id, isAdmin: isUser.isAdmin },
        process.env.jwt_token,
        {
          expiresIn: "30d",
        }
      );
      const { password: pass, ...rest } = isUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          user: { ...rest, token: token },
        });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.signWithGoogle = async (req, res) => {
 
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) {
      let randPassword = Math.random().toString().slice(-8);
      const hashPass = bcrypt.hashSync(randPassword, 10);
      const beforeUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPass,
        profile: req.body.profile,
      });
      const user = await beforeUser.save();

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.jwt_token,
        {
          expiresIn: "30d",
        }
      );



      const { password: pass, ...rest } = user._doc;
      res.status(200)
      // .cookie("access_token", token, { httpOnly: true })
      .json({
        user: { ...rest, token: token },
      });
    } else {
      const token = jwt.sign(
        { id: isUser._id, isAdmin: isUser.isAdmin },
        process.env.jwt_token,
        {
          expiresIn: "30d",
        }
      );

      const { password: pass, ...rest } = isUser._doc;
      res.status(200)
      // .cookie("access_token", token, { httpOnly: true })
      .json({
        user: { ...rest, token: token },
      });
    }
  } catch (error) {}
};
