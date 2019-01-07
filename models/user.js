const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
        },
        phone: {
			type: String,
			trim: true,
			required: true
        },
        address: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ collection: 'users' }
);

UserSchema.pre('save', function(next) {
	console.log('User Pre save method is invoked');
	// if (!this.isNew) {
	// 	next();
	// }
	next();
});

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('User', UserSchema);