// Before all other 'require' statements

const express = require("express");
const port = 8080;
const app = express();
const bcrypt = require('bcrypt');
const cluster = require("cluster");


if (cluster.isMaster) {
    console.log("Number of CPUs is " + parseInt(process.argv[2]));
    console.log(`Master ${process.pid} is running`);
   
    // Fork workers.
    for (let i = 0; i < parseInt(process.argv[2]); i++) {
      cluster.fork();
    }
   
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} is running`);
    // Obviously keys should not be kept in code, these should be populated with environmental variables or key store
    const secret = {
        iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
        key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
    }
    app.use(require('express-status-monitor')());
    //TO ENCRYPT
    var encryptit = (message,res) =>{

        //GEN THE SALT
        bcrypt.genSalt(16,(err,result)=>{
            console.log(result);
            //debug
            console.log("STARTING THE ENCRYPTION WITH THE GIVEN SALT..");
            //HASH IT
            bcrypt.hash(message,result,(err,result_two)=>{
                //RETURN STATEMENT
                res.status(200).json({"Message": result_two});  
            });
        });
    }

    //FUNCTION TO ENCRYPT
    app.post("/encrypt",(req,res)=>{
        //THE BODY
        var body = req.body;

        //MAKE THE ENCRYPTION APPEN
        var result = encryptit(body.message,res);

    });


    app.listen(port);

}

