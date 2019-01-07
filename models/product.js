const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
        },
        unit_price: {
			type: Number,
			trim: true,
			required: true
        },
        description: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ collection: 'products' }
);

ProductSchema.pre('save', function(next) {
	console.log('Product Pre save method is invoked');
	// if (!this.isNew) {
	// 	next();
	// }
	next();
});

ProductSchema.plugin(bcrypt);
ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('Product', ProductSchema);