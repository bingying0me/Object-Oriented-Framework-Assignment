const mongoose = require('mongoose');

var collectionName = 'Staff';

var staffSchema = new mongoose.Schema({
	staff_id: {
		type: Number
	},
	staff_firstname: {
		type: String
	},
	staff_lastname: {
		type: String
	},
	pwd: {
		type: String
	},
	position: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	}
});

mongoose.model('Staff', staffSchema, collectionName);
