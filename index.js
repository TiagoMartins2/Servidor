// const express = require('express');
// const app = express();
// const PORT = 8080;
// const multer = require('multer');
// const path = require('path');
// const bcrypt = require('bcrypt');


// var  gm = require('gm');

// function change(img, color){
//     gm(img)
//     .transparent(color)
//     .write("transparent.png", function (err){
//         if (!err) console.log('done');
//     });
// }



// //UPLOAD DA IMAGEM
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         req = change(file, 'red');
//         file = change(file, 'green');
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({
//     storage: storage
// })

// app.use('/profile', express.static('upload/images'));
// app.post("/upload", upload.single('profile'), (req, res) =>{
//     res.json({
//         success: 1,
//         profile_url: `http://localhost:8080/profile/${req.file.filename}`
//     })
// })



// app.use('/profile', express.static('upload/images'));
// app.post("/upload2", upload.single('profile'), (req, res) =>{

//     res.json({
//         success: 1,
//         profile_url: `http://localhost:8080/profile/${req.file.filename}`
//     })
// })



// var crypto = require('crypto');
// //ENCRYPT FUNCTION
// function encrypt(text){
//     var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
//     var crypted = cipher.update(text,'utf8','hex')
//     crypted += cipher.final('hex');
//     return crypted;
//   }

// //BCRYPT INFINITE FUNC
// var encrypt = (messge) = {

//     //GEN THE SALT




// }






// app.post('/crypt/:string', (req, res) => {
//     res.send({
//         message: encrypt(req.params.string)
//     });
// });



// app.post("/upload2", upload.single('profile'), (req, res) =>{

//     res.json({
//         success: 1,
//         profile_url: `http://localhost:8080/profile/${req.file.filename}`
//     })
// })




// //SIMPLE GET
// app.get('/shirt', (req, res) =>{
//     res.status(200).send({
//         size: 'large'
//     })
//     console.log("Success to Get shirt");
// });



// //SIMPLE POST
// app.post('/shirt', (req, res) =>{
//     const { size } = req.params; 
//     res.status(200).send({ size: size });
//     console.log("Succes in the post");  
// });
                          


// //LISTEN THE SERVER
// app.listen(PORT, () => {
//     console.log(' listening on port')
// });









///////////////////////////////////////////////////////////////////////////
/////////////////////ENCRYPT IMAGE POST AND GET ///////////////////////////
///////////////////////////////////////////////////////////////////////////


// Before all other 'require' statements

const express = require("express");
const port = 8080;
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const bcrypt = require('bcrypt');
const CryptoAlgorithm = "aes-256-cbc";
var performance = require('performance');
// Obviously keys should not be kept in code, these should be populated with environmental variables or key store
const secret = {
    iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
    key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
}
app.use(require('express-status-monitor')());
//TO ENCRYPT
var encryptit = (message,salt,res) =>{



//GEN THE SALT
bcrypt.genSalt(salt).then((result)=>{
 //debug
console.log("STARTING THE ENCRYPTION WITH THE GIVEN SALT..");
//HASH IT
bcrypt.hash(message,result,(err,result_two)=>{
    //RETURN STATEMENT
    res.status(200).json({"Message": result_two});  
});
   
})
//CATCH
.catch((error)=>{
res.status(400).json({"Message": error});
});




}

//FUNCTION TO ENCRYPT
app.post("/encrypt",(req,res)=>{
//THE BODY
var body = req.body;

//MAKE THE ENCRYPTION APPEN
encryptit(body.message,body.salt,res);

});

//POST THE IMAGE
app.post("/img", upload.single('image'),async(req,res)=>{
    //CHECK IF THERES AN FILE
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
    //CREATE AN SALT
    bcrypt.genSalt(16).then((salt)=>{
    //HASH
    bcrypt.hash(req.file.buffer.toString('base64'),salt).then((result)=>{
    //THE RESPONSE
    res.status(200).json({hash:result,salt:salt});
    });
    });
    
});


//VERIFY
app.post("/checkImg",upload.single('image'),async (req,res)=>{

     //GRAB THE BODY
     var body = req.body;

    //CHECK IF THERES AN FILE
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
      }
    
    
        //HASH IT AND THEN VERIFY IT
    bcrypt.hash(req.file.buffer.toString('base64'),body.salt).then((result)=>{
        //VERIFY IT
        if(body.hash===result){
        //RESPONSE STATUS
        res.status(200).json({response: "Validation Ok"});
        }else{
        //ERROR MSG
        res.status(400).json({response: "Validation not ok"});
        }
    
        }).catch((erro)=>{
        res.status(400).json({response: "Salt format not ok"});
        });
     
    

})






app.listen(port);
console.log(`Serving at http://localhost:${port}`);







