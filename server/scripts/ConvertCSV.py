import pymongo 
import pandas as pd
import sys
import math
import os 
from dotenv import load_dotenv
# CONSTANTS 
#csvCollection = ConnToDB()


# Get env variables
load_dotenv()
#Setup MongoDB
myClient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myClient['WardrivingMapper']
csvCollection = mydb.csvCollection
clientCollection = mydb.clientCollection



def GetEntries(mac):
    #deviceArray = [] 
    devices = csvCollection.find({'mac_address': mac}, {"lat": 1, 'lon': 1, 'name': 1, 'mac_address': 1, 'firstTimeSeen': 1, "lastTimeSeen": 1})
    if devices != None: 
        test = pd.DataFrame((list(devices)))
        #print('testDevice', test)
        return test
    else: 
        return []
def GetClientEntries(mac):
    devices = clientCollection.find({'mac_client': mac}, {'connected_network': 1, 'mac_client': 1})
    if devices != None: 
        test = pd.DataFrame((list(devices)))
        #print('testDevice', test)
        return test
    else: 
        return []

"""
Check The distance between the two points and returns true if the point are not within 25 feet of each other
else returns false, takess 4 coordinates as input (x1, y1, x2, y2)

"""
def CheckDist(x1, y1, x2, y2): 
    if(math.dist([x1, y1], [x2, y2]) <= 0.00022321514286586752):
        return False
    else:
        return True




def CheckForDuplicates(df):
    #print(df)

    for element in df: 
        #print('Element', element)
        #print('element', df[element])
        if(element == 'mac_address'):
            #print('mac_address', df[element])
            print("test")
            for mac in df[element]:
                duplicate = GetEntries(mac=mac)
                for idx, element in duplicate.iterrows(): 
                    #print('element', idx,  element['lat'])
                    #print('element', idx,  element['lon'])
                    isSamePlace = CheckDist(element['lon'], element['lat'], df.loc[df['mac_address'] == mac]['lon'], df.loc[df['mac_address'] == mac]['lat'])
                    if(isSamePlace == True):
                        #print("Not duplicate")       
                        """                 
                    elif(isSamePlace == False and element['lastTimeSeen'] <= df.loc[df['mac_address'] == mac]['lastTimeSeen']):
                        print("Duplicate")
                        df.drop(df.loc[df['mac_address'] == mac].index, inplace=True)
                        print(df)
                        """
                    else:
                        #print("Duplicate")
                        csvCollection.delete_one({'_id': element['_id']})
    for idx, element in df.iterrows():
        for ind, ele in df.iterrows():
            if(idx != ind): 
                isSamePlace = CheckDist(element['lon'], element['lat'], ele['lon'], ele['lat'])
                if(isSamePlace != True):
                    if(element['mac_address'] == ele['mac_address'] and element['lastTimeSeen'] <= ele['lastTimeSeen']):
                        #print("Duplicate", element['mac_address'], ele['mac_address'])
                        df.drop(ind, inplace=True)
                        #print(df)
    #After all check we insert the data into the database
    InsertToDB(df)


def insertClients(): 
    csvClientDF = pd.read_csv(f'{sys.argv[1].replace(".csv", "_clients.csv")}', delimiter=',')
    print(csvClientDF)


    for inx, element in csvClientDF.iterrows(): 
        #print(inx, element)
        networksDF = GetEntries(element['connected_network'])
        if(networksDF.empty == True): 
            print('Wrong network attached')
            csvClientDF.drop(inx, inplace=True)
        else: 

            print("Test : ", element['mac_client'])
            print(GetClientEntries(mac=element['mac_client']))
            if(GetClientEntries(mac=element['mac_client']).empty == True):
                print("not a duplicate")
            else: 

                for element in GetClientEntries((element['mac_client']))['connected_network'].values:
                    print("value ELEMENT: ", element)
                    if(element == csvClientDF.loc[inx]['connected_network']):
                        clientCollection.delete_one({'mac_client': csvClientDF.loc[inx]['mac_client'], 'connected_network': csvClientDF.loc[inx]['connected_network']})
                        print("Duplicate Deleted")
    dbAns = InsertToClientDB(csvClientDF)
    
def main(): 
    #csvCollection = ConnToDB()
    csvDF = pd.read_csv(f'{sys.argv[1]}', delimiter=',')
    CheckForDuplicates(csvDF)
    insertClients()

def InsertToClientDB(df): 
    DFdict = df.to_dict('records')
    _id = clientCollection.insert_many(DFdict)
    if(_id != None):
        print('Insert Successful')
        return True 
    else: 
        print('Insert Failed')
        return False

def InsertToDB(dataFrame):
    DFdict = dataFrame.to_dict('records')
    _id = csvCollection.insert_many(DFdict)
    if(_id != None):
        print('Insert Successful')
        return True 
    else: 
        print('Insert Failed')
        return False

if __name__ == '__main__':
    try: 
        main()
    except Exception as e:
        print(e)
        print('Error while uploading to database')
        sys.exit(2)