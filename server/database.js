const { MongoClient, ObjectId } = require('mongodb')
const spawn = require('await-spawn')
const fs = require('fs')
// Connection URL
const wardriveurl = 'mongodb://localhost:27017'
const wardriveClient = new MongoClient(wardriveurl)
// Database
let warDB = wardriveClient.db('WardrivingMapper')

async function connectToUsersDB(callback) {
  try {
    await wardriveClient.connect()
    //usersDatabase = await usersDatabase.database(dbName);
    console.log('Connected successfully to local users db')
    callback()
  } catch (err) {
    console.error('Could not connect to local users db')
    console.error(err)
  }

  return 'done.'
}
/*
async function UploadWigleToDB(capturesPath) {
    await spawn("python", ["./scripts/UploadWigle.py", capturesPath]);

}
async function UploadCsvToDB(devicesPath, packetsPath) {
    console.log('packetsPath: ', packetsPath);
    console.log('devicesPath: ', devicesPath);
    // /console.log("🚀 ~ file: database.js ~ line 31 ~ UploadCsvToDB ~ devicesPath", devicesPath)

    try {
        await spawn("python", ["./scripts/ConvertCSV.py", devicesPath, packetsPath]);

        return true;

    } catch (err) {
        console.log('err: ', err);

        return false;
    }
}
*/

async function UploadNetxmlCSVToDB(csvPath) {
  try {
    await spawn('python', ['./scripts/ConvertCSV.py', csvPath])

    return true
  } catch (err) {
    console.log('err: ', err)

    return false
  }
}

async function GetAllDeviceForMap() {
  const collection = warDB.collection('captures')
  const aps = await collection
    .find(
      {},
      {
        projection: { MAC: 1, CurrentLatitude: 1, CurrentLongitude: 1, _id: 0 },
      },
    )
    .limit(100)
    .toArray()

  let apList = []
  for (let i = 0; i < aps.length; i++) {
    let length = apList.push(aps[i])

    for (var x = 0; x < apList.length; x++) {
      if (
        aps[i].MAC == apList[x].MAC &&
        aps[i].CurrentLatitude == apList[x].CurrentLatitude &&
        aps[i].CurrentLongitude == apList[x].CurrentLongitude
      ) {
        if (aps[i].SSID == null) {
          apList.pop(i)
          apList.push(apList[x])
        }
      }
    }
  }
  return apList
}
async function GetAllLocationsForMap() {
  const collection = warDB.collection('csvCollection')
  const locations = await collection.find({}).toArray()

  return locations
}
function WriteJSONFile(data, path) {
  fs.writeFile('../locations.json', JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
}

function GetByNameFromDB(SSID) {
  const collection = warDB.collection('csvCollection')

  const device = collection.find({ name: SSID }).toArray()
  return device
}

function GetByMacFromDB(MAC) {
  const collection = warDB.collection('csvCollection')
  const device = collection.find({ mac_address: MAC }).toArray()
  return device
}

function GetByWpaFromDB(WPA) {
  const collection = warDB.collection('csvCollection')
  const device = collection.findOne({ wpaVersion: WPA })
  return device
}

function GetByEncryptionFromDB(Encryption) {
  const collection = warDB.collection('csvCollection')
  const device = collection.findOne({ encryption: Encryption })
  return device
}
async function GetDevicesByMac(mac) {
  const deviceCollection = warDB.collection('clientCollection')
  const devices = await deviceCollection
    .find({ connected_network: String(mac) })
    .toArray()
  return devices
}

module.exports = {
  connectCallBack: connectToUsersDB,
  GetAllDeviceForMap,
  UploadNetxmlCSVToDB,
  GetAllLocationsForMap,
  WriteJSONFile,
  GetByNameFromDB,
  GetByMacFromDB,
  GetByWpaFromDB,
  GetByEncryptionFromDB,
  GetDevicesByMac,
}
