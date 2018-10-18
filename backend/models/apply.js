var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppliesSchema = new Schema({
  jobId: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('apply', AppliesSchema);
