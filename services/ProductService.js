const Product = require('../models/product');

const findByData = async function(data) {
   return await Product.find(data)
	.then( async (mongoProduct) => {
		console.log('Product found: '+mongoProduct);
		if(mongoProduct === null || mongoProduct === 'undefined' || mongoProduct.length < 1) { 
			return await Product.create(data).then((productObj) => {
				console.log("Product Created: "+JSON.stringify(productObj));
				return productObj;
			});
		}
		else {
			return mongoProduct;
		}
	})
	.catch(err => {
		console.error(err);
    });
}

module.exports.findByData = findByData;