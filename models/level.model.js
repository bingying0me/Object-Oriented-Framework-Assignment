const mongoose = require('mongoose');

var collectionName = 'Level';

var levelSchema = new mongoose.Schema({
	level_id: {
		type: Number
	},
	level_name: {
		type: String
	},
	discount_rate: {
		type: Number
	}
});

mongoose.model('Level', levelSchema ,collectionName);
