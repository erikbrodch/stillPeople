var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  picture: String,
  origin: { type: String, default: "Arik" },
  stolenFrom: { type: String, default: "UD" },
  stolenBy: { type: String, default: "UD" }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

