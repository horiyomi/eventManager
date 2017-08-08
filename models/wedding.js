const mongoose = require('mongoose');

let weddingSchema = mongoose.Schema(
	{
		names:{
			groom:{ 
				type: String, 
				required: true
			},
			bride:{ 
				type: String, 
				required:true
			},
			bookingName: {
				type:String,
				required:true}
			},
		venue:{
			type:String,
			required:true
		},
		bookingDate:{
			type:Date,
			default:Date.now
		},
		phone:{
			type:String,
			max:11,
			required:true
		},
		eventDate:{
			type:Date,
			required:true
		}
	},

{ collection:'wedding'});

let Wedding = module.exports = mongoose.model('Wedding',weddingSchema); 