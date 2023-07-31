const User = require('../models/user')
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
exports.createUser = async (req, res) => {
  const {fullname, email, password} = req.body
  console.log(fullname)
  const isNewUser = await User.isThisEmailInUse(email)
  if(!isNewUser) 
    return res.json({
      success: false, 
      message: 'This email already in use!'
    })
  const user = await User({
    fullname, 
    email,
    password
  });
  await user.save()
  res.json(user)
}

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: 'user not found, with the given email!',
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: 'email / password does not match!',
    });
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // res.json({success: true, user, token})

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
  };

  res.json({ success: true, user: userInfo, token });
};