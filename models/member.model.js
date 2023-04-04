const mongoose = require('mongoose');

var collectionName = 'Member';

var memberSchema = new mongoose.Schema({
	member_id: {
		type: Number
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	gender: {
		type: String
	},
	birthdate: {
		type: Date
	},
	phone: {
		type: String
	},
	email: {
		type: String
	}
    },
    {

    timestamps: true
    });

mongoose.model('Member', memberSchema , collectionName);
