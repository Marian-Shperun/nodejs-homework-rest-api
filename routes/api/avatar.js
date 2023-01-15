const express = require("express");

const ctrl = require("../../controllers/avatar");

const { autenticate, upload } = require("../../middlewares");

const router = express.Router();

// avatar
router.patch(
  "/avatars",
  autenticate,
  upload.single("avatar"), 
  ctrl.updateAvatar
);
router.get("/avatars", (req, res) => {
  
});

module.exports = router;
