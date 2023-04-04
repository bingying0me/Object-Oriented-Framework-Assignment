const mongoose = require('mongoose');

var collectionName = 'Shopping_history';

var shopping_historySchema = new mongoose.Schema({
	history_id: {
		type: Number
	},
	member_id: {
		type: Number
	},
	purchase_time: {
		type: Date
	}
});

mongoose.model('Shopping_history', shopping_historySchema, collectionName);
