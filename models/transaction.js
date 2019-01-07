const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
	{
		date: {
			type: Date,
			required: true
        },
        quantity: {
			type: Number,
			required: true
        },
        total_price: {
			type: Number,
			required: true
        },
        product_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        user_id: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
	},
	{ collection: 'transactions' }
);

TransactionSchema.plugin(bcrypt);
TransactionSchema.plugin(timestamps);
TransactionSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('Transaction', TransactionSchema);