var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  nickname: { type: String, required: true },
  auth0_id: { type: String, required: true },
  campus: { type: String, required: true, maxLength: 100 },
  comment: [{ type: Schema.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("User", UserSchema);
