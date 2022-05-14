//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvJson = require('csvtojson');
const { rm } = require('fs/promises');
const spawn = require('await-spawn')


//const { connectCallback, CreateUser, Connect, connectToUsersDB, GetAllLocations} = require('./database');
//var jwt = require('jsonwebtoken');
//const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan');
//const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
//const graphRoute = require('./graph_routes/graph_routes')
const path = require('path')



app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.send("Wassup").status(200);
});

app.post('/upload', upload.single('data'), async function (req, res) {
    if(req.file){
        if(req.file.mimetype == "application/octet-stream" && req.body.fileName){ 
            console.log(req.file, req.body);
            console.log('req.file.mimetype: ', req.file.mimetype);
        
            console.log('Path: ', req.file.path);
            const python = await spawn('python', ['../testing/NetXML-to-CSV/main.py', "./" + req.file.path, "./uploads/" + req.body.fileName + ".csv"]);
            console.log('python: ', python);
            console.log("converting to json...");
            const document = await csvJson().fromFile("./uploads/" + req.body.fileName + ".csv");
            console.log(document);
            //await collection.insertMany(document) or sum 
            rm("./" + req.file.path);
            res.send({path: "/data/" + req.body.fileName + ".csv",
                        data: document}).status(200);
        
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


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});