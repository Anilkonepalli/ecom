const User = require('../models/user');
const Transaction = require('../models/transaction');
const Product = require('../models/product');
const TransactionService = require('../services/TransactService');

exports.get = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	Transaction.aggregate(
		[
			{
				$group: {
					_id: {u_id: "$user_id"},
					lastTransaction :  { $last: "$date"},
					total_transactions: { $sum:1 },
					user_details : { "$push" : "$user_details" }
				}
			},
	 {    $lookup: {
			from: "users",
			localField: "_id.u_id",
			foreignField: "_id",
			as: "user_details"
		}
	 },
	 {
		"$unwind": {
			"path": "$user_details",
			"preserveNullAndEmptyArrays": true
		}
	},
	 {    
			$lookup: {
				from: "transactions",
				localField: "lastTransaction",
				foreignField: "date",
				as: "transaction_details"
			}
		},
		
	 {
		"$unwind": {
			"path": "$transaction_details",
			"preserveNullAndEmptyArrays": true
			}
		},
		{
			"$project" : {
				_id: 0,
				lastTransaction: 1,
				total_transactions: 1,
				"user_details.name" : 1,
				"user_details.phone" : 1,
				"user_details.address" : 1,
				"transaction_details.product_id" : 1,
				"transaction_details.quantity" : 1,
				"transaction_details.total_price" : 1	
			}
		}		
		]).exec(
			function(err, results) {
				if (err) {
					next(err);
				} else {
					console.log('resutls: '+JSON.stringify(results));
					return res.send(results);
				}
			});
	// return res.send(TransactionService.get());
};

exports.post = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const data = req.body || {};

	console.log('req.body :', req.body);

	 await TransactionService.save(data)
	.then((transaction) => {
		return res.send(transaction);
	})
	.catch(err => {
		console.error(err);
		res.status(422).send(err.errors);
	});

};