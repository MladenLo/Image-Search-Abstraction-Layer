var mongoose = require('mongoose');
mongoose.connect('mongodb://mladenlo:picajzla1@ds121171.mlab.com:21171/mladenlosandbox');
var Schema = mongoose.Schema;

var History = new Schema({
  term: { type: String, required: true },
  when : { type : Date, default: Date.now }
});

module.exports = mongoose.model('History', History);