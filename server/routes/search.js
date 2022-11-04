const { GetByNameFromDB,
    GetByMacFromDB,
    GetByWpaFromDB,
    GetByEncryptionFromDB} = require('../database');

const router = require('express').Router();

router.get('/name/:name', async (req, res) => {
    
    const name = req.params.name;
    const device = await GetByNameFromDB(name);
    if(device){
        res.status(200).send(device);
    }
    else{
        res.status(401).send("No device found");
    }
}
);

router.get('/mac/:mac', async (req, res) => {
    const mac = req.params.mac;
    const device = await GetByMacFromDB(mac);
    if(device){
        res.status(200).send(device);
    }
    else{
        res.status(401).send("No device found");
    }
}
);

router.get('/wpa/:wpa', async (req, res) => {
    const wpa = req.params.wpa;
    const device = await GetByWpaFromDB(wpa);
    if(device){
        res.status(200).send(device);
    }
    else{
        res.status(401).send("No device found");
    }
}
);

router.get('/encryption/:encryption', async (req, res) => {
    const encryption = req.params.encryption;
    const device = await GetByEncryptionFromDB(encryption);
    if(device){
        res.status(200).send(device);
    }
    else{
        res.status(401).send("No device found");
    }
}
);
module.exports = router;