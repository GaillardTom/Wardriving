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
async function UploadWigleToDB(capturesPath){ 
    await spawn("python", ["./scripts/UploadWigle.py", capturesPath]);

}
async function UploadCsvToDB(devicesPath, packetsPath) {
    console.log('packetsPath: ', packetsPath);
    console.log('devicesPath: ', devicesPath);

    try {
        await spawn("python", ["./scripts/ConvertCSV.py", devicesPath, packetsPath]);
        
        return true;

    }catch(err){ 
        console.log('err: ', err);
        
        return false;
    }
}

module.exports = {
        connectCallBack: connectToUsersDB,
        UploadCsvToDB,
        UploadWigleToDB,
}