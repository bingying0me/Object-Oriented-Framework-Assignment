const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Staff = mongoose.model('Staff');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

function updateRecord(req, res) {
	Staff.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('staff/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("staff/edit", {
					viewTitle: "Edit Staff",
					staff: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Staff.find((err, docs) => {
		if(!err){
			res.render("staff/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving staff list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Staff.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("staff/edit", {
				viewTitle: "Edit Staff",
				staff: doc
			});
		}
	});
});

module.exports = router;
