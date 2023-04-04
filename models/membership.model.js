const mongoose = require('mongoose');
var db = mongoose.connection;

var collectionName = 'Membership';

var membershipSchema = new mongoose.Schema({
	member_id: {
		type: Number
	},
	level_id: {
		type: Number
	},
	start_date: {
		type: Date
	},
	expiry_date: {
		type: Date
	},
	stat: {
		type: String
	}
    },
    {

    timestamps: true
    });

mongoose.model('Membership', membershipSchema, collectionName);
