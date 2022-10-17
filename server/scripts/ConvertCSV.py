import pymongo 
import pandas as pd
import sys

myClient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myClient['WardrivingMapper']
csvCollection = mydb.csvCollection
#devicesCollection = mydb.devices
#packetsCollection = mydb.packets


#devicesDF = pd.read_csv(f'{sys.argv[1]}',delimiter='\t')
#packestDF = pd.read_csv(f'{sys.argv[2]}', delimiter='\t')
csvDF = pd.read_csv(f'{sys.argv[1]}', delimiter=',')
print(csvDF)
#deviceDict = devicesDF.to_dict('records')
#packetDict = packestDF.to_dict('records')
DFdict = csvDF.to_dict('records')

csvCollection.insert_many(DFdict)
#devicesCollection.insert_many(deviceDict)
#packetsCollection.insert_many(packetDict)
