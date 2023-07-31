const {check, validationResult} = require('express-validator')
exports.validateUserSignUp = [
  check('fullname').trim().not().isEmpty().withMessage('fullname is require!').isString().withMessage('Must be a valid name!').isLength({min: 6, max: 20}).
  withMessage('Name must be within 6 to 20 character!'),
  check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
  check('password').trim().not().isEmpty().withMessage('Password is empty!').isLength({min: 6, max: 20}).
  withMessage('Password must be 6 to 20 character long!'),
  check('confirmPassword').trim().not().isEmpty().custom((value, {req}) => {
    if(value !== req.body.password){
      throw new Error('Both password must be same!')
    }
    return true;
  })
]

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password is required!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('email / password is required!'),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();

  if(!result.length) return next();

  const error = result[0].msg;
  res.json({success: false, message: error})
}