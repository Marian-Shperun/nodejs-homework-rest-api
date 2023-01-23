const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateAuth, autenticate } = require("../../middlewares");

const { authSchemasValidation } = require("../../validations");
const { registerSchema, loginSchema } = authSchemasValidation;

const router = express.Router();
// signup

router.post("/register", validateAuth(registerSchema), ctrl.register);

// signin
router.post("/login", validateAuth(loginSchema), ctrl.login);

// Verification user
router.post("/verify", ctrl.reVerification);
router.get("/verify/:verificationToken", ctrl.verify);

// current user
router.get("/current", autenticate, ctrl.getCurrent);

// logout
router.post("/logout", autenticate, ctrl.logout);

module.exports = router;
