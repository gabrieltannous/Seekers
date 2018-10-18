var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var ProfileSchema = new Schema({
    _creator: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],

    firstname: String,
    middlename: String,
    lastname: String,
    contactinfo: {
        phonenumber: String,
        address: {
            street: String,
            city: String,
            state: String,
            zip: String
        }
    }

});*/

var JobsSchema = new Schema({
  title: {
    type: String
  },
  type: {
    type: String
  },
  salary: {
    type: Number
  },
  companyId: {
    type: String
  },
  company: {type: mongoose.Schema.Types, ref: 'Company'},
  applied: {
    type: Boolean
  }
  // company: {
  //   name: {
  //     type: String
  //   },
  //   address: {
  //     type: String
  //   },
  //   email: {
  //     type: String
  //   }
  // }
}, {
  versionKey: false
});


module.exports = mongoose.model('job', JobsSchema);
