var express = require("express");
var router = express.Router();
var comment_controller = require("../controllers/commentController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("comment");
});

// GET request: get comment list by professor id.
router.get("/professor/:id", comment_controller.comment_list_byProfessorId);

// GET request: get comment list by user id.
router.get("/user/:id", comment_controller.comment_list_byUserId);

// GET request: get one comment.
router.get("/id/:id", comment_controller.comment_detail);

// POST request: create comment.
router.post("/create", comment_controller.comment_create);

// DELETE request: delete comment.
router.delete("/delete/:id", comment_controller.comment_delete);

// POST request: update comment.
router.post("/update/:id", comment_controller.comment_update);

module.exports = router;
