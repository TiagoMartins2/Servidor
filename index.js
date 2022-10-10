const express = require('express');
const app = express();
const PORT = 8080;
const multer = require('multer');
const path = require('path');



var  gm = require('gm');

function change(img, color){
    gm(img)
    .transparent(color)
    .write("transparent.png", function (err){
        if (!err) console.log('done');
    });
}



//UPLOAD DA IMAGEM
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        req = change(file, 'red');
        file = change(file, 'green');
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

app.use('/profile', express.static('upload/images'));
app.post("/upload", upload.single('profile'), (req, res) =>{
    res.json({
        success: 1,
        profile_url: `http://localhost:8080/profile/${req.file.filename}`
    })
})



app.use('/profile', express.static('upload/images'));
app.post("/upload2", upload.single('profile'), (req, res) =>{

    res.json({
        success: 1,
        profile_url: `http://localhost:8080/profile/${req.file.filename}`
    })
})



var crypto = require('crypto');
//ENCRYPT FUNCTION
function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

app.post('/crypt/:string', (req, res) => {
    res.send({
        message: encrypt(req.params.string)
    });
});



app.post("/upload2", upload.single('profile'), (req, res) =>{

    res.json({
        success: 1,
        profile_url: `http://localhost:8080/profile/${req.file.filename}`
    })
})




//SIMPLE GET
app.get('/shirt', (req, res) =>{
    res.status(200).send({
        size: 'large'
    })
    console.log("Success to Get shirt");
});



//SIMPLE POST
app.post('/shirt', (req, res) =>{
    const { size } = req.params; 
    res.status(200).send({ size: size });
    console.log("Succes in the post");  
});
                          


//LISTEN THE SERVER
app.listen(PORT, () => {
    console.log(' listening on port')
});









/////////////////////////////////////////////////////////////////////////////
///////////////////////ENCRYPT IMAGE POST AND GET ///////////////////////////
/////////////////////////////////////////////////////////////////////////////



// const express = require("express");
// const port = 8080;
// const app = express();
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const crypto = require("crypto");
// const fs = require("fs");
// const path = require("path");
// const stream = require("stream");

// const CryptoAlgorithm = "aes-256-cbc";

// // Obviously keys should not be kept in code, these should be populated with environmental variables or key store
// const secret = {
//     iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
//     key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
// }

// app.use(express.static("./public"));
// app.use(bodyParser.json());

// const storage = multer.memoryStorage()
// const upload = multer({ storage });

// function encrypt(algorithm, buffer, key, iv) {
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     const encrypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
//     return encrypted;
// };

// function decrypt(algorithm, buffer, key, iv) {
//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
//     return decrypted;
// }

// function getEncryptedFilePath(filePath) {
//     return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + "_encrypted" + path.extname(filePath))
// }

// function saveEncryptedFile(buffer, filePath, key, iv) {
//     const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);

//     filePath = getEncryptedFilePath(filePath);
//     if (!fs.existsSync(path.dirname(filePath))) {
//         fs.mkdirSync(path.dirname(filePath))
//     }

//     fs.writeFileSync(filePath, encrypted);
// }

// function getEncryptedFile(filePath, key, iv) {
//     filePath = getEncryptedFilePath(filePath);
//     const encrypted = fs.readFileSync(filePath);
//     const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
//     return buffer;
// }

// app.post("/upload", upload.single("file"),  (req, res, next) => {
//     console.log("file upload: ", req.file.originalname);
//     saveEncryptedFile(req.file.buffer, path.join("./uploads", req.file.originalname), secret.key, secret.iv);
//     res.status(201).json( { status: "ok" });
// });

// app.get("/file/:fileName", (req, res, next) => {
//     console.log("Getting file:", req.params.fileName);
//     const buffer = getEncryptedFile(path.join("./uploads", req.params.fileName), secret.key, secret.iv);
//     const readStream = new stream.PassThrough();
//     readStream.end(buffer);
//     res.writeHead(200, {
//         "Content-disposition": "attachment; filename=" + req.params.fileName,
//         "Content-Type": "application/octet-stream",
//         "Content-Length": buffer.length
//     });
//     res.end(buffer);
// });

// app.listen(port);
// console.log(`Serving at http://localhost:${port}`);







