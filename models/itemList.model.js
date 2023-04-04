const mongoose = require('mongoose');

var collectionName = 'ItemList';

var itemListSchema = new mongoose.Schema({
	item_id: {
		type: Number
	},
	list_id: {
		type: Number
	},
	history_id: {
		type: Number
	},
	amount: {
		type: Number
	}
});

mongoose.model('ItemList', itemListSchema,collectionName);
