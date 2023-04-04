const mongoose = require('mongoose');

var collectionName = 'Reward';

var rewardSchema = new mongoose.Schema({
	member_id: {
		type: Number
	},
	reward_id: {
		type: Number
	},
	reward_amount: {
		type: Number
	}
});

mongoose.model('Reward', rewardSchema, collectionName);
