# NetXML-to-CSV

## Synopsis

Convert a .netxml file into CSV file. 
For those who use Kismet and want to display networks on a Google Maps for example.

CVS file with columns : ESSID, mac address, encryption, wpa version, number of packets, data size, latitude, longitude, firstTimeSeen, lastTimeSeen

## Code Example

Convert every network into a csv file : 
```
python3 main.py file.netxml result.csv
```

Convert only WEP encryption networks :
```
python3 main.py file.netxml result.csv WEP
```
Convert only WPA+AES-CCM encryption networks :
```
python3 main.py file.netxml result.csv WPA+AES-CCM
```
