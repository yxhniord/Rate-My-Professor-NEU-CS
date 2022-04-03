var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/userController");

// GET users listing.
router.get("/", function (req, res, next) {
  res.send("user");
});

// GET request: get one user.
router.get("/:id", user_controller.user_detail);

// POST request: create user.
router.post("/create", user_controller.user_create);

// DELETE request: delete user.
router.delete("/delete/:id", user_controller.user_delete);

// POST request: update user.
router.post("/update/:id", user_controller.user_update);

module.exports = router;
