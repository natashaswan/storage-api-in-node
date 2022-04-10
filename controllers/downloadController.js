const express = require('express')
const server = express();
const fs = require("fs");
const path = require("path");

const downloadController = (req, res) => {
    const objectID = req.params.id;
    const repo = req.params.repository;
    const pathToFile = path.join(__dirname, "..", "models/", repo + ".json");

    let dataRead = fs.readFileSync((pathToFile), (err, data)=>{
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
            function(dataRead){ return dataRead.oid == oid }
        );
      }
      
    const dataToShow = getDataByID(objectID); 

    if (dataToShow.length>0){
        res.status(200).send(`status: "200 OK" , data: ${dataToShow}`);
    }
    else {
        res.status(404).send("404 NOT FOUND");
    }
    
}
module.exports = downloadController;