var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/userController");
const {checkJWT} = require('../checkJWT');

router.all("*", checkJWT);

// GET users listing.
router.get("/", function (req, res, next) {
  res.send("user");
});

// GET request: get one user by user id.
router.get("/:id", user_controller.user_detail);

// GET request: get one user by auth0_id.
router.get("/auth0_id/:id", user_controller.user_detail_by_auth0id);

// POST request: create user.
router.post("/create", user_controller.user_create);

// DELETE request: delete user.
router.delete("/delete/:id", user_controller.user_delete);

// POST request: update user.
router.post("/update/:id", user_controller.user_update);

module.exports = router;
