const mongoose = require('mongoose');
const { type } = require('os');

const productsSchema = new mongoose.Schema({ //
    email : String,
    title : String,
    prodURL : String,
    price : String,
    imgUrl : String,
})

const LoginSchema = new mongoose.Schema({ //
    name: {
        type : String,
        required : true
    },
    gender : String,
    age : Number,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const UserSchema = new mongoose.Schema({
    email : String,
    productName : String, 
    price : Number  
})


// const NotifySchema = new mongoose.Schema({
//     email : String,
//     productName: String,
//     price : Number
// });

//const Notify = mongoose.model('Notify',NotifySchema)
const Product = mongoose.model('Product',productsSchema);
const User = mongoose.model('User',UserSchema);
const Login = mongoose.model('Login',LoginSchema)
module.exports = {
    Product : Product ,
    User : User,
    Login : Login,
}