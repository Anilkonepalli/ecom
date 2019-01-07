const User = require('../models/user');
const Transaction = require('../models/transaction');
const Product = require('../models/product');

const UserService = require('../services/UserService');
const ProductService = require('../services/ProductService');

const save = async function(data) {
	console.log('data from service :', data);

	let user, product, userData = {
		name : data.name,
		phone: data.phone,
		address: data.address
	},
	productData = {
		name : data.transaction.product.name,
		unit_price: data.transaction.product.unit_price,
		description: data.transaction.product.description
	};


	user = await UserService.findByData(userData);
	product = await ProductService.findByData(productData);
	
	console.log("User before Transaction: "+JSON.stringify(user));
	console.log("Product before Transaction: "+JSON.stringify(product));


	let total_price = data.transaction.product.quantity * productData.unit_price;
	
	console.log("Transaction total Price: "+JSON.stringify(total_price));

	let transaction = Object.assign({
		user_id: user._id,
		product_id: product._id,
		quantity: data.transaction.product.quantity,
		total_price: total_price,
		date: new Date()
	});
		
	let transactionRes = Transaction.create(transaction);

	return transactionRes;
}

module.exports.save = save;