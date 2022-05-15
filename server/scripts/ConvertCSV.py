import pymongo 
import pandas as pd
import sys

myClient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myClient['WardrivingMapper']
devicesCollection = mydb.devices
packetsCollection = mydb.packets


devicesDF = pd.read_csv(f'{sys.argv[1]}',delimiter='\t')
packestDF = pd.read_csv(f'{sys.argv[2]}', delimiter='\t')


deviceDict = devicesDF.to_dict('records')
packetDict = packestDF.to_dict('records')


devicesCollection.insert_many(deviceDict)
packetsCollection.insert_many(packetDict)
