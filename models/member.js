var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MemberSchema = new Schema(
  {
    user_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    phone_number: { type: String, required: true, max: 20 },
    password: { type: String, required: true, max: 100 },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active'},
    last_login: { type: Number }
  }
);

// Virtual for member user_name
MemberSchema
  .virtual('v_user_name')
  .get(function () {
    return this.user_name;
  });

// Virtual for member email
MemberSchema
  .virtual('v_email')
  .get(function () {
    return this.email;
  });

// Virtual for member phone number
MemberSchema
  .virtual('v_phone_number')
  .get(function () {
    return this.phone_number;
  });

// Virtual for member password
MemberSchema
  .virtual('v_password')
  .get(function () {
    return this.password;
  });

// Virtual for member status
MemberSchema
.virtual('v_status')
.get(function () {
  return this.status;
});

// Virtual for members last login
MemberSchema
.virtual('v_last_login')
.get(function () {
  var date = new Date(this.last_login);
  return moment(date).format('DD/MM/YYYY hh:mm:ss');
});

// Virtual for member URL
MemberSchema
.virtual('url')
.get(function () {
  return '/catalog/member/' + this._id;
});

//Export model
module.exports = mongoose.model('Member', MemberSchema);