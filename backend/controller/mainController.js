const formidable = require('formidable')
const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");
const { Product } = require('../model/model')
const { User } = require('../model/model')
const { Notify } = require('../model/model')
const { Login } = require('../model/model')

const IMGBB_API_KEY = "8a496163927b9d9e0480e2850c8f8047";
const GOOGLE_API_KEY = "e46eb16e06b86f316f7c4fcb0059c24f949e1cec889d9dcbdfc087f140452d40"

let emailValue;

exports.createUser = async (req,res) =>  {
    const data = { 
        mail : req.body.mail, 
        password : req.body.password
    }

    const existingUser = await Login.findOne({mail:req.body.mail})
    if(existingUser){
        res.send("User Already Exist")
    }
    else{
        res.send("Signed Up")
        const userdata = await Login.insertMany(data);
        console.log(userdata) 
    }
}

exports.loginUser = async (req,res) => {
    try{
       const check = await Login.findOne({mail:req.body.mail})
       console.log(check.password, req.body.password)
       if(!check){
        res.send("User not found")
       } 
       if(req.body.password == check.password){
        console.log(`Logged in as ${check.mail}`)
        res.status(200).json({
            status : "success",
            message : "Loged In"
        })
       }
       else{
        console.log(`Wrong password`)
        res.status(400).json({
            status : "Fail",
            message : "Wrong Password"
        })
       }
    }catch(err){
        console.log(`Wrong details`)
        res.status(400).json({
            status : "Fail"
        })
    }
} 


// exports.getImage = async (req,res) => {
//     const form = formidable({});
//      let fields;
//      let files;
//      try {
//          [fields, files] = await form.parse(req);
         
//         //  if empty files
//         if (Object.keys(files).length === 0) {
//             throw new Error('No files were uploaded.');
//         }

//         const image = files.image[0];
//         // Read the file data
//         const fileData = fs.readFileSync(image.filepath);

//         // Convert file data to a base64 encoded string
//         const base64Image = new Buffer.from(fileData).toString('base64');

//          // Prepare the payload to imgBB
//          const formData = new URLSearchParams();
//          formData.append('image', base64Image);
         
//           // Send the request to imgBB
//           const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
//               headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded'
//               }
//           });
 
//          //console.log(JSON.stringify(imgBBResponse.data.data.url))

//          //Running image in Google lens api
//          const googleLensResults = await new Promise((resolve, reject) => {
//             getJson(
//               {
//                 engine: "google_lens",
//                 url:imgBBResponse.data.data.url,
//                 api_key: GOOGLE_API_KEY,
//               },
//               (json) => {
//                 if (json) {
//                   resolve(json.visual_matches[0]);
//                 } else {
//                   reject(new Error('No visual matches found in Google Lens.'));
//                 }
//               }
//             );
//           });
//          prodTitle = googleLensResults.title
//         //console.log("Google Lens visual matches:", googleLensResults);

//         //Shopping API
//         const shoppingResults = await new Promise((resolve, reject) => {
//             getJson(
//               {
//                 engine: "google_shopping",
//                 q: googleLensResults.title,
//                 api_key: GOOGLE_API_KEY,
//                 gl:"in"
//               },
//               (json) => {
//                 if (json) {
//                   resolve(json.shopping_results.slice(0,5));
//                 } else {
//                   reject(new Error('No visual matches found in Google Lens.'));
//                 }
//               }
//             );
//           });
        
//         const num =[];
//           //Creating document in MondoDB
//         for(let i = 0;i<5; i++){
//             const newProduct = await Product.create({
//                 title : shoppingResults[i].title.slice(0,12),
//                 prodURL : shoppingResults[i].link,
//                 price : shoppingResults[i].price,
//                 imgUrl : shoppingResults[i].thumbnail
//             })
//             num.push(newProduct._id.toString());
//             console.log(`${i}:Saved`)
//         }

//         const newUser = await User.create({
//             mail : req.emailValue,
//             productId : num 
//         })
//         return

//      } catch (err) {
//          // example to check for a very specific error
//          console.error(err);
//          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
//          res.end(String(err));
//          return;
//      }    

// }