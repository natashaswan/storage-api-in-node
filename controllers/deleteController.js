const express = require('express')
const server = express();
const fs = require("fs");
const path = require("path");

const deleteController = (req, res) => {
    const objectID = req.params.id;
    const repo = req.params.repository;

    if (objectID && repo) {
        const pathToFile = path.join(__dirname, "..", "models/", repo + ".js");
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
        
        function getDataByID(oid) {
            return dataRead.filter(
                function(dataRead){ return dataRead.oid != oid }
            );
          }
          
        let dataToPersist = getDataByID(objectID);
        fs.writeFileSync(pathToFile, dataToPersist, (err)=>{
            if (err){
                console.log(err);
            }            
        })   
         
        res.status(200).json( {status: "200 OK"} );
    } 
    
}

module.exports = deleteController;