const express = require('express')
const server = express();
const fs = require("fs");
const path = require("path");

const downloadController = (req, res) => {
    const objectID = req.params.id;
    console.log(objectID)
    const repo = req.params.repository;
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
    console.log(typeof dataRead);
    function getDataByID(oid) {
        return dataRead.filter(
            function(dataRead){ return dataRead.oid == oid }
        );
      }
      
    let dataToShow = getDataByID(objectID);
    
     
    console.log(dataToShow)
    res.status(200).json( {status: "200 OK" , data: dataToShow} );
    
}
module.exports = downloadController;