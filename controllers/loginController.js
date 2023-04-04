const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

router.get('/', (req, res) => {
	res.render("login/index", {

	});
});

router.post('/', function(req,res){
	var staff_id = req.body.staff_id;
	var pwd = req.body.pwd;

	var data = {
		"staff_id": staff_id,
		"pwd":pwd
	}

  db.collection('Staff').findOne(data, function(err,result){
      if(err) throw err;
      if (result){
          console.log(result);
          res.render('login/signup_success');
      }else{
          console.log(result);
          console.log('Login failure. Wrong account or password');
      }
  });

})



module.exports = router;
