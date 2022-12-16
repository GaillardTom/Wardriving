const express = require('express')
const cors = require('cors')
const multer = require('multer')
const csvJson = require('csvtojson')
const { rm } = require('fs/promises')
const spawn = require('await-spawn')
const {
  connectCallBack,
  UploadCsvToDB,
  UploadWigleToDB,
  GetDevicesByMACFromDB,
  GetAllDeviceForMap,
  UploadNetxmlCSVToDB,
  GetAllLocationsForMap,
  WriteJSONFile,
  GetDevicesByMac,
} = require('./database')
const searchRoutes = require('./routes/search')
//const { connectCallback, CreateUser, Connect, connectToUsersDB, GetAllLocations} = require('./database');
//var jwt = require('jsonwebtoken');
//const {CheckJWT} = require('./middlewares/auth');
var morgan = require('morgan')
require('dotenv').config();
//const services = require('./services/services');
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
//const graphRoute = require('./graph_routes/graph_routes')
const path = require('path')
const { delimiter } = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  },
})

var upload = multer({ storage: storage })
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use('/search', searchRoutes)

app.get('/', (req, res) => {
  res.send('Wassup').status(200)
})

app.get('/all', async (req, res) => {
  const ans = await GetAllLocationsForMap()
  if (ans) {
    res.send(ans).status(200)
  } else {
    res.status(401).send('No devices Found')
  }
})

app.post('/csv', upload.single('wigle'), async function (req, res) {
  if (req.file) {
    try {
      await UploadWigleToDB('./' + req.file.path)
      rm(req.file.path)

      res.send('Uploaded').status(200)
    } catch {
      res.status(403).send('Not Uploaded')
    }
  }
})
/* A post request that is uploading a file to the server. */
app.post('/upload', upload.single('data'), async function (req, res) {
  if (req.file) {
    console.log(req.file)
    console.log(req.file.path)
    console.log(req.body.filename)
    if (
      /*req.file.mimetype == "application/octet-stream" && */ req.file.filename
    ) {
      console.log(req.file, req.body)
      console.log('req.file.mimetype: ', req.file.mimetype)

      console.log('Path: ', req.file.path)
      console.log('converting to csv...')
      //console.log("req.file.path.replace('.kismet', '')", req.file.path.replace('.kismet', ''));
      const python = await spawn('python', [
        './scripts/main.py',
        './' + req.file.path,
        './' + req.file.path.replace('.netxml', '.csv'),
      ])
      console.log('Done converting to csv')
      //const deviceDoc = await csvJson().fromFile('./' + req.file.path.replace('.kismet', 'Devices.csv'));
      //const packetsDoc = await csvJson().fromFile('./'+ req.file.path.replace('.kismet', 'PacketsData.csv'));

      //const devicesFile = req.file.path.replace('.kismet', "Devices.csv");
      //const packetsFile = req.file.path.replace('.kismet', "PacketsData.csv");
      //const csvFile = req.file.path.replace('')
      console.log('done converting to json', python)
      const ans = await UploadNetxmlCSVToDB(
        '.\\' + req.file.path.replace('.netxml', '.csv'),
      )
      if (ans) {
        rm('./' + req.file.path)
        rm('./' + req.file.path.replace('.netxml', '.csv'))
        rm('./' + req.file.path.replace('.netxml', '_clients.csv'))

        res
          .send({
            path: req.file.path.replace('.netxml', '.csv'),
          })
          .status(200)
      } else {
        res.status(304).send('File Not uploaded to DB')
        // rm("./" + req.file.path);
        // rm("./" + req.file.path.replace('.netxml', '.csv'));
        // rm("./" + req.file.path.replace('.netxml', '_clients.csv'));
      }

      //await collection.insertMany(document) or sum
      // rm("./" + req.file.path);
      // rm("./" + req.file.path.replace('.netxml', '.csv'));
      // rm("./" + req.file.path.replace('.netxml', '_clients.csv'));
    } else {
      // rm("./" + req.file.path);
      // rm("./" + req.file.path.replace('.netxml', '.csv'));
      // rm("./" + req.file.path.replace('.netxml', '_clients.csv'));

      res.send('Wrong extension or no name for the file').status(406)
    }
  } else {
    res.send('no file provided').status(406)
  }
})
app.get('/devices/:mac', async (req, res) => {
  if (req.params.mac) {
    const mac = req.params.mac
    const devices = await GetDevicesByMac(mac)
    console.log('devices:', devices)
    if (devices != []) {
      res.send(devices).status(200)
    } else {
      res.status(404).send('No devices found')
    }
  } else {
    res.status(401).send('No MAC provided')
  }
})
/* A get request that is getting all the devices from the database. */
app.get('/map', async (req, res) => {
  try {
    const aps = await GetAllDeviceForMap()
    res.send(aps)
  } catch {
    res.status(402).send("Couldn't Get Map")
  }
})

const PORT = 8080
connectCallBack(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})
