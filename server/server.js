//require('dotenv').config();
const express = require('express')
const cors = require('cors');
//const { connectCallback, CreateUser, Connect, connectToUsersDB, GetAllLocations} = require('./database');
//var jwt = require('jsonwebtoken');
//const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan');
//const services = require('./services/services');
const bodyParser = require('body-parser');
const app = express();
//const graphRoute = require('./graph_routes/graph_routes')
//const path = require('path')



app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res)=> { 
    res.send("Wassup").status(200);
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});