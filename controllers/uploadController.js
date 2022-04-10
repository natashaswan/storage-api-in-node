const express = require('express')
const server = express();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");


const uploadController = (req, res) => {
    const repo = req.params.repository;
    const size = req.body.size;
    const pathToFile = path.join(__dirname, "..", "models/", repo + ".js");

    if (size){
        const dataToWrite = {
            oid: uuid(),
            size: size
        }
    
        let dataRead = fs.readFileSync((pathToFile), "utf-8", (err, data)=>{
                    if (err){
                        console.log(err);
                    }
                    else {  
                        data = JSON.parse(data);                  
                        return data;
                    }
                });
         
        dataRead = JSON.parse(dataRead);
        
        function checkDataMatch(size) {
            return dataRead.filter(
                function(dataRead){ return dataRead.size == size }
            );
          }
          
        let ifDataMatch = checkDataMatch(size);
          
        if (!ifDataMatch){
            let dataToWriteToFile = [... dataRead];
            dataToWriteToFile.push(dataToWrite)
            fs.writeFileSync(pathToFile, dataToWriteToFile, (err)=>{
                if (err){
                    console.log(err);
                }            
            })
            res.status(200).json( {status: "201 Created" , data: dataToWrite})
        }        
    }
       
}
module.exports = uploadController;