const { MongoClient, ObjectId } = require('mongodb');
const spawn = require('await-spawn');

// Connection URL
const wardriveurl = 'mongodb://localhost:27017';
const wardriveClient = new MongoClient(wardriveurl);
// Database
let warDB = wardriveClient.db('WardrivingMapper');

async function connectToUsersDB(callback) {
    try {
        await wardriveClient.connect();
        //usersDatabase = await usersDatabase.database(dbName);
        console.log('Connected successfully to local users db');
        callback();
    } catch (err) {
        console.error('Could not connect to local users db')
        console.error(err);
    }

    return 'done.';
}

async function UploadWigleToDB(capturesPath) {
    await spawn("python", ["./scripts/UploadWigle.py", capturesPath]);

}
async function UploadCsvToDB(devicesPath, packetsPath) {
    console.log('packetsPath: ', packetsPath);
    console.log('devicesPath: ', devicesPath);

    try {
        await spawn("python", ["./scripts/ConvertCSV.py", devicesPath, packetsPath]);

        return true;

    } catch (err) {
        console.log('err: ', err);

        return false;
    }
}

async function GetDevicesByMACFromDB(macAddress) {

    const collection = warDB.collection('captures');
    const devices = await collection.find({ MAC: macAddress }).toArray();
    console.log('devices: ', devices);

    if (devices) {
        return devices;

    }
    else {
        return false;
    }
}
async function GetAllDeviceForMap() {
    console.log('etst')
    const collection = warDB.collection('captures');
    console.log('etst')

    const aps = await collection.find({}, {projection:{ MAC: 1, CurrentLatitude: 1, CurrentLongitude: 1,_id: 0}}).limit(100).toArray();
    console.log('etst')

    console.log('aps: ', aps);
    let apList = [];
    console.log(apList[0]);
    console.log(aps.length);
    for (let i = 0; i < aps.length; i++) {
        
        let length = apList.push(aps[i])
        console.log('length: ', length);
        for (var x = 0; x < apList.length; x++) {
            console.log('apList: ', apList[0]);
            if (aps[i].MAC == apList[x].MAC && aps[i].CurrentLatitude == apList[x].CurrentLatitude && aps[i].CurrentLongitude == apList[x].CurrentLongitude) {
                if (aps[i].SSID == null) {
                    apList.pop(i);
                    apList.push(apList[x]);
                }
            } 
        }
    }
    return apList;

}

module.exports = {
    connectCallBack: connectToUsersDB,
    UploadCsvToDB,
    UploadWigleToDB,
    GetDevicesByMACFromDB,
    GetAllDeviceForMap
}