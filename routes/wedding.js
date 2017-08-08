var express = require('express');
var router = express.Router();
let Wedding = require('../models/wedding');


/* GET users listing. */
router.get('/', (req, res, next)=>{
	Wedding.find({},(err,wedding)=>{
		if(err){
			console.log(err);
		} else{
			 res.render('wedding',{category:'Wedding',wedding:wedding});
		}
	});
});

//Adding Wedding Booking
router.post('/booking',(req,res,next)=>{
	req.checkBody('groom','Groom\'s name is required').notEmpty();
	req.checkBody('bride','Bride\'s name is required').notEmpty();
	req.checkBody('bookingName','Booking Name is required').notEmpty();
	req.checkBody('venue','Venue is required').notEmpty();
	req.checkBody('bookingDate','Booking Date is required').notEmpty();
	req.checkBody('phone','Phone Number is required').notEmpty();
	req.checkBody('eventDate','Event Date is required').notEmpty();

	let errors = req.validationErrors();

	if(errors){
		console.log(errors);
	} else{
		let wedding = new Wedding();

		wedding.names.groom = req.body.groom;
		wedding.names.bride = req.body.bride;
		wedding.names.bookingName = req.body.bookingName;
		wedding.venue = req.body.venue;
		wedding.bookingDate = req.body.bookingDate;
		wedding.phone = req.body.phone;
		wedding.eventDate = req.body.eventDate;

		wedding.save((err)=>{
			if(err){
				console.log(err);
			} else{
				// req.flash('success','Booking was Successful')
				res.redirect('/wedding');
			}
		});
	}
});
// Getting Editing Route
router.get('/edit/booking/:id',(req,res)=>{
	Wedding.findById(req.params.id,(err,wedding)=>{
		if(err){
			console.log(err);
			return;
		}
		// console.log(wedding)
		res.render('edit_wedding_booking',{wedding:wedding});
	});
});


module.exports = router;
