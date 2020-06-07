const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLengthChecker = (title) =>{
  if(!title){
    return false;
  }else{
    if(title.length<5||title.length>50){
      return false;
    }else{
      return true;
    }
  }
};
let alphaNumericTitleChecker = (title) =>{
  if(!title){
    return false;
  }else{
    const regExp = new
    RegExp(/^[a-zA-Z0-9 ]+$/);
      return regExp.test(title); 
  }
};
const titleValidators = [
  {
    validator: titleLengthChecker,
    message:'tiltle must be atleast 5 characters but no more than 50'
  },
  {
    validator: alphaNumericTitleChecker,
    message:'title must be alphanumeric'
  }
];

let bodyLengthChecker = (body) =>{
  if(!body){
    return false;
  }else{
    if(body.length<5||body.length>500){
      return false;
    }else{
      return true;
    }
  }
};

// Array of Username validators
const bodyValidators = [
  // First Username validator
  {
    validator: bodyLengthChecker,
    message: 'body must be at least 5 characters but no more than 500'
  }
  // Second username validator
  
];

// Validate Function to check password length
let commentLengthChecker = (comment) => {
  // Check if password exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check password length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format


// Array of Password validators
const commentValidators = [
  // First password validator
  {
    validator: commentLengthChecker,
    message: 'comment must be at least 1 character but no more than 200'
  }
];


const blogSchema = new Schema({
   title: { type: String, required:true, validate:titleValidators},
   body: { type: String, required:true, validate:bodyValidators},
   createdBy: {type: String},
   createdAt: {type: Date, default: Date.now()},
   likes:{type:Number, default:0},
   likedBy:{type: Array},
   dislikes:{type:Number, default:0},
   dislikedBy:{type: Array},
   comments:[
       {
           comment: {type: String, validate:commentValidators},
           commentator: {type: String}
       }
   ]
});



module.exports = mongoose.model('Blog',blogSchema);