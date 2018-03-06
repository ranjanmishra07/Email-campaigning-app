const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
     email:String,
     respondes:{type:Boolean,default:false}
});

mongoose.exports=recipientSchema;
