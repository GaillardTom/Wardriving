//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csvJson = require('csvtojson');
const { rm } = require('fs/promises');
const spawn = require('await-spawn')
const { connectCallBack, UploadCsvToDB, UploadWigleToDB } = require('./database');

//const { connectCallback, CreateUser, Connect, connectToUsersDB, GetAllLocations} = require('./database');
//var jwt = require('jsonwebtoken');
//const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan');
//const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
//const graphRoute = require('./graph_routes/graph_routes')
const path = require('path');
const { delimiter } = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
  })
  
var upload = multer({ storage: storage });
app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.send("Wassup").status(200);
});
app.post('/csv', upload.single('wigle'), async function(req, res){ 
    if(req.file){ 
        try{ 
            await UploadWigleToDB("./"+req.file.path);
            rm(req.file.path);

            res.send('Uploaded').status(200);

        }
        catch{ 
            res.status(403).send("Not Uploaded");
        }
    }
});
app.post('/upload', upload.single('data'), async function (req, res) {
    if(req.file){
        
        if(req.file.mimetype == "application/octet-stream" && req.body.fileName){ 
            console.log(req.file, req.body);
            console.log('req.file.mimetype: ', req.file.mimetype);
        
            console.log('Path: ', req.file.path);
            console.log("req.file.path.replace('.kismet', '')", req.file.path.replace('.kismet', ''));
            const python = await spawn('python', ['./scripts/kismet_to_csv.py', "--in", "./" + req.file.path, "--out", './' + req.file.path.replace('.kismet', '')]);
            console.log('python: ', python);
            console.log("converting to json...");
            //const deviceDoc = await csvJson().fromFile('./' + req.file.path.replace('.kismet', 'Devices.csv'));
            //const packetsDoc = await csvJson().fromFile('./'+ req.file.path.replace('.kismet', 'PacketsData.csv'));

            const devicesFile = req.file.path.replace('.kismet', "Devices.csv");
            const packetsFile = req.file.path.replace('.kismet', "PacketsData.csv");

            const ans = await UploadCsvToDB("./"+devicesFile, "./"+packetsFile);
            if( ans){ 
                res.send({pathPackets: req.file.path.replace('.kismet', 'PacketsData.csv'),
                pathDevices: req.file.path.replace('.kismet', 'Devices.csv'),
                }).status(200);
            }
            else{ 
                res.status(304).send("File Not uploaded to DB");
            }

            //await collection.insertMany(document) or sum 
            rm("./" + req.file.path);
            

        
        }
        else{ 
            rm("./" + req.file.path);
    
            res.status(406).send("Wrong extension or no name for the file");
        }

    }
    else{ 
        res.status(406).send("no file provided");
    }
    
    


});

app.get('/devices', async(req,res)=> { 


    
});

const PORT = 8080;
connectCallBack(()=> { 
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})