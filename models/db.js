const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true}, (err) => {
	if (!err) {console.log('MongoDB Connection Succeeded.')}
	else{console.log('Error in DB connection : ' +err)}
});

require('./member.model');
require('./membership.model');
require('./level.model');
require('./item.model');
require('./itemList.model');
require('./reward.model');
require('./shopping_history.model');
require('./staff.model');