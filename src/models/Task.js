const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Task', Task);
