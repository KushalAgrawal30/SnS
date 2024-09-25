const { formidable } = require('formidable')
const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");
const { Product } = require('../model/model')
const { User } = require('../model/model')
const { Notify } = require('../model/model')
const { Login } = require('../model/model')
const session = require('express-session')
const bodyParser = require('body-parser')


const IMGBB_API_KEY = "8a496163927b9d9e0480e2850c8f8047";
const GOOGLE_API_KEY = "e46eb16e06b86f316f7c4fcb0059c24f949e1cec889d9dcbdfc087f140452d40"

let emailValue;


exports.createUser = async (req,res) =>  {
    const data = req.body.userData 
    console.log(data)
    try{
        const existingUser = await Login.findOne({email:data.email})
        if(existingUser){
            console.log("User already exits")
            res.status(400).json({
                success : false,
                message : "User Already exist"
            })
        }
        else{
            const userdata = await Login.insertMany(data);
            console.log("User created",userdata) 
            res.status(200).json({
                success : true,
                message : "User Created"
            })
        }
        
    }catch(err){
        console.log(`Error in create user`)
        res.status(400).json({
            success : false
        })
    }
    
}

exports.loginUser = async (req,res) => {
    console.log(req.body)
    try{
       const check = await Login.findOne({email:req.body.email})
       console.log(check.password, req.body.password)
       if(!check){
        return res.status(400).json({
            success : false,
            message : "User Dont exist"
        })
       }
       else{
        if(req.body.password == check.password){
            req.session.loggedIn = true;
            req.session.username = req.body.email
            console.log(`Logged in as ${check.email}`)
            res.status(200).json({
                success : true,
                message : "Loged In"
            })
           }
           else{
            console.log(`Wrong password`)
            res.status(400).json({
                success : false,
                message : "Wrong Password"
            })
           }
       } 
    }catch(err){
        console.log(`Wrong details`)
        res.status(400).json({
            success : false
        })
    }
} 


exports.getImage = async (req,res) => {
     const form = formidable({});
     let fields;
     let files;
     try {
         [fields, files] = await form.parse(req);
         
        //  if empty files
        if (Object.keys(files).length === 0) {
            throw new Error('No files were uploaded.');
        }

        const image = files.image[0];
        // Read the file data
        const fileData = fs.readFileSync(image.filepath);

        // Convert file data to a base64 encoded string
        const base64Image = new Buffer.from(fileData).toString('base64');

         // Prepare the payload to imgBB
         const formData = new URLSearchParams();
         formData.append('image', base64Image);
         
          // Send the request to imgBB
          const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          });
         console.log(JSON.stringify(imgBBResponse.data.data.url))

     } catch (err) {
         // example to check for a very specific error
         console.error(err);
         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
     }    

}