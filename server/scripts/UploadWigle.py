import pymongo 
import pandas as pd
import sys


myClient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myClient['WardrivingMapper']


capturesCollection = mydb.captures
wigleDF = pd.read_csv(f"{sys.argv[1]}", delimiter=',', skiprows=1)


wigleDict = wigleDF.to_dict('records')


capturesCollection.insert_many(wigleDict)