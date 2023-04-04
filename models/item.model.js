const mongoose = require('mongoose');

var collectionName = 'Item';

var itemSchema = new mongoose.Schema({
	item_id: {
		type: Number
	},
	item_name: {
		type: String
	},
	price: {
		type: Number
	}
});

mongoose.model('Item', itemSchema , collectionName);
