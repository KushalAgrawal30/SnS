const { formidable } = require('formidable')
const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");
const { Product } = require('../model/model')
const { User } = require('../model/model')
const { Login } = require('../model/model')
const session = require('express-session')
const bodyParser = require('body-parser')

const IMGBB_API_KEY = "8a496163927b9d9e0480e2850c8f8047";
const GOOGLE_API_KEY = "86c8c71ddb4a335aa4287b3703f534421cb156d0a324333419b3826469195717"

let emailValue;
let prodTitle;

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
            emailValue = req.body.email;
            req.session.save((err) => {
                if (err) {
                    console.log("Session save error", err);
                    return res.status(500).json({ success: false, message: "Session save error" });
                }
            })
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
     console.log(emailValue)
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
         
         const googleLensResults = await new Promise((resolve, reject) => {
            getJson(
              {
                engine: "google_lens",
                url:imgBBResponse.data.data.url,
                api_key: GOOGLE_API_KEY,
              },
              (json) => {
                if (json) {
                  resolve(json.visual_matches[0]);
                } else {
                  reject(new Error('No visual matches found in Google Lens.'));
                }
              }
            );
          });
         prodTitle = googleLensResults.title
         console.log(prodTitle)

         const shoppingResults = await new Promise((resolve, reject) => {
            getJson(
              {
                engine: "google_shopping",
                q: googleLensResults.title,
                api_key: GOOGLE_API_KEY,
                gl:"in"
              },
              (json) => {
                if (json) {
                  resolve(json.shopping_results.slice(0,5));
                } else {
                  reject(new Error('No visual matches found in Google Lens.'));
                }
              }
            );
          });

          const num = []
          for(let i=0;i<5;i++){
            const newProduct = await Product.create({
                email : emailValue,
                title : shoppingResults[i].title.slice(0,12),
                prodURL : shoppingResults[i].link,
                price : shoppingResults[i].price,
                imgUrl : shoppingResults[i].thumbnail
            })
            num.push(newProduct._id.toString())
          }
          console.log(num)

     } catch (err) {
         // example to check for a very specific error
         console.error(err);
         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
     }    
}

exports.sendData = async (req, res) => {
    try{
        const prodData = []
        let currentId = await Product.find({email : emailValue})
        for(let i=0;i<5;i++){
            let x = await Product.findById(currentId[i]._id)
            prodData.push(x)
        }
        console.log(prodData)
        const result = await Product.deleteMany({});
        console.log(result);

        return res.status(200).json({
            status : "Success",
            result : prodData.length,
            data : prodData
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status : "Fail",
            message: 'server error'
        })   
    }

}

exports.getPrice = async (req,res) => {
    try{
        const price = req.body
        console.log(price.priceCheck, prodTitle)
        const userData = await User.insertMany({
            email : emailValue,
            productName : prodTitle,
            price : price.priceCheck
        })
        console.log("Data saved")
        res.status(200).json({
            success : true,
            message : "Price Submited"
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success : false,
            message : "Error"
        })
    }
}