const express = require('express');
const router = express.Router();
const { requiredSignIn, isAdmin } = require("../middlewares/authMiddleware")
const { resetPassword, registerController, loginController, testController, forgotPasswordController } = require("../controller/authController");
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/reset-password', resetPassword);
router.get('/test', requiredSignIn, isAdmin, testController);
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post('/forgot-password', forgotPasswordController)
module.exports = router;
