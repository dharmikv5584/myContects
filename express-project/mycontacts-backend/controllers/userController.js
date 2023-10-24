const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//@description register a usser
//@route GET /api/user/register
//@acess public

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvilable = await User.findOne({ email });

  if (userAvilable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hased Password : ", hashedPassword);

  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`created user is ${user}`);

  if (user) {
    res.json({ id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data Not Valid.!!");
  }
});

//@description login a usser
//@route GET /api/user/login
//@acess public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Feild Are Mendetery!");
  }

  const user = User.findOne(req.params.email);

  if (user || (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
  res.json({ messege: "current user" });
});

//@description get current user details
//@route GET /api/user/current
//@acess public

const currentUser = asyncHandler((req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
