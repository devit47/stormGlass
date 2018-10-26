var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BeachSchema = new Schema(
  {
    beach_name: { type: String, required: true, max: 100 },
    location: { type: String, required: true, max: 100 },
    wind_speed: { type: Number },
    wind_direction: { type: String, required: true, max: 100 },
    difficulty: {type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate'}
  }
);

// Virtual for beach_name
BeachSchema
  .virtual('v_beach_name')
  .get(function () {
    return this.beach_name;
  });

// Virtual for location
BeachSchema
  .virtual('v_location')
  .get(function () {
    return this.location;
  });

// Virtual for wind_speed
BeachSchema
  .virtual('v_wind_speed')
  .get(function () {
    return this.wind_speed;
  });

// Virtual for wind_direction
BeachSchema
.virtual('v_wind_direction')
.get(function () {
  return this.wind_direction;
});

// Virtual for difficulty
BeachSchema
.virtual('v_difficulty')
.get(function () {
  return this.difficulty;
});

// Virtual for beach URL
BeachSchema
.virtual('url')
.get(function () {
  return '/catalog/beach/' + this._id;
});

//Export model
module.exports = mongoose.model('Beach', BeachSchema);