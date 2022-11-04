import pymongo 
import pandas as pd
import sys


# CONSTANTS 
#csvCollection = ConnToDB()



myClient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myClient['WardrivingMapper']
csvCollection = mydb.csvCollection


#TODO - Add a check to check for duclpicate entries and delete them before adding to the database
# Still not working correctly



def GetEntries(mac):
    #deviceArray = [] 
    devices = csvCollection.find({'mac_address': mac}, {"lat": 1, 'lon': 1, 'name': 1, 'mac_address': 1, 'firstTimeSeen': 1, "lastTimeSeen": 1})
    if devices != None: 
        test = pd.DataFrame((list(devices)))
        print('testDevice', test)
        return test
    else: 
        return []

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
                print(duplicate)
                print(df.loc[df['mac_address'] == mac]['lastTimeSeen'])
                #print('duplicate:', duplicate)
                #if(duplicate != None):
                print(duplicate)
                print('Duplicate Found')
                if (df.loc[df['mac_address'] == mac]['lastTimeSeen'] < duplicate.loc[duplicate['mac_address'] == mac]['lastTimeSeen']):
                    print('Newer Entry Found')
                        #csvCollection.delete_one({'mac_address': df[element]})
                    return True
                else:
                    print('No Duplicate Found')
                    return False
        



def main(): 
    #csvCollection = ConnToDB()
    csvDF = pd.read_csv(f'{sys.argv[1]}', delimiter=',')
    print(csvDF)
    CheckForDuplicates(csvDF)
    

#CheckForDuplicates(df=csvDF)


#DFdict = csvDF.to_dict('records')

#csvCollection.insert_many(DFdict)

if __name__ == '__main__':
    try: 
        main()
    except Exception as e:
        print(e)
        print('Error')
        sys.exit(1)