const express = require('express');
const app = express();
const PORT = 8080;
const multer = require('multer');
const path = require('path');



//UPLOAD DA IMAGEM
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
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




app.listen(PORT, () => {
    console.log(' listening on port')
});

