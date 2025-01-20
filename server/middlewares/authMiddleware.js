const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requiredSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    console.log("happening")
    next();
  } catch (error) {
    console.log("not corrected still");
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (user.role !== 1) {
      return res.status(404).send({
        success: false,
        message: 'UnAuthorized User'
      });
    }
    else {
      next()
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
}
module.exports = { requiredSignIn, isAdmin };