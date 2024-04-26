const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
});


module.exports = mongoose.model("User", userSchema);
