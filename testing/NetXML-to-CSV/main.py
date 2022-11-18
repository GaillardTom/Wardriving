from ast import Sub
import sys
import xml.etree.ElementTree as etree
import time

if __name__ == '__main__':

    # Check if number of arguments is correct, otherwise print usage
    if len(sys.argv) < 3:
        print("Usage: %s <NetXML File> <Output File Name> <Filter> (Filter is optional)" % sys.argv[0])
        sys.exit(1)

    # Store args
    inputFilename = sys.argv[1]
    outputFilename = str(sys.argv[2])
    mode = sys.argv[3] if len(sys.argv) == 4 is not None else ""

    tree = etree.parse(inputFilename)
    root = tree.getroot()

    # Open csv file (or create it if not exist)
    outfile = open(outputFilename, "w")
    clientFileName = outputFilename.replace(".csv", "") + "_clients.csv"
    clientOutFile = open(f"{clientFileName}", "w")
    # Create columns in csv
    outfile.write("name,mac_address,encryption,wpaVersion,nbPackets,dataSize,lat,lon,firstTimeSeen,lastTimeSeen")
    clientOutFile.write("mac_client,packetsNb_client,encoding_client,number_client,channel_client,carrier_client,datasize_client,encrypted_clients_packets,client_type,connected_network")
    # For each network
    for child in root:
        if child.tag == "wireless-network":

            essid = ""
            bssid = "None"
            encryption = []
            wpaVersion = "None"
            gpslat = "None"
            gpslng = "None"
            nbPackets = "None"
            dataSize = "None"
            firstTimeSeen = child.attrib['first-time']
            lastTimeSeen = child.attrib['last-time']

            ### FOR CLIENTS ###


            mac_client = ""
            packetsNb_client = "None"
            encoding_client = ""
            number_client = "None" 
            channel_client = "None"
            carrier_client = "None"
            datasize_client = "None"
            encrypted_packets_client = "None"
            connected_network = "None"
            client_type = "None"
            # Parse each network
            for element in child:

                # Get ESSID and Encryption type
                if element.tag == "SSID":
                    for subelement in element:
                        if subelement.tag == "encryption":
                            encryption.append(str(subelement.text))
                        elif subelement.tag == "wpa-version": 
                            wpaVersion = str(subelement.text)
                        elif subelement.tag == "essid":
                            if subelement.attrib['cloaked'] == "true":
                                essid="Cloaked"
                            else:
                                essid = str(subelement.text).replace(",", " ")

                # Get MAC Address
                if element.tag == "BSSID":
                    bssid = str(element.text)
                    print("BSSID Connected NEtworK: " + bssid)
                    connected_network = bssid

                # Get GPS informations
                if element.tag == "gps-info":
                    for gps in element:
                        if gps.tag == "avg-lat":
                            gpslat = str(gps.text)
                        if gps.tag == "avg-lon":
                            gpslng = str(gps.text)
                if element.tag == "packets":
                    for subelement in element: 
                        if subelement.tag == "total":
                            nbPackets = str(subelement.text)
                if element.tag == "datasize":
                    print("DataSize: ", element.text)
                    dataSize = str(element.text)
            
                if element.tag == "wireless-client":
                    #print("Number Client", element.attrib['number'])
                    number_client = str(element.attrib['number'])
                    client_type = str(element.attrib['type'])
                    for subelement in element: 
                        print(subelement.tag, subelement.text)
                        if(subelement.tag == "client-mac"): 
                            mac_client = str(subelement.text)
                        if(subelement.tag == "packets"):
                            for subsubelement in subelement: 
                                if(subsubelement.tag == "crypt"):
                                    encrypted_packets_client = str(subsubelement.text)
                                if(subsubelement.tag == "total"):
                                    packetsNb_client = str(subsubelement.text)
                        if(subelement.tag == "datasize"): 
                            datasize_client = str(subelement.text)
                        if(subelement.tag == "encoding"):
                            encoding_client = str(subelement.text)
                        if(subelement.tag == "channel"):
                            channel_client = str(subelement.text)
                        if(subelement.tag == "carrier"):
                            carrier_client = str(subelement.text)
                    if(mac_client != "" and connected_network != "None"):
                        print("Connected Network wrote to file: " + connected_network)
                        clientOutFile.write(f"\n{mac_client},{packetsNb_client},{encoding_client},{number_client},{channel_client},{carrier_client},{datasize_client},{encrypted_packets_client},{client_type},{connected_network}")    
                        
                    print("Wireless-Client", element.text)


                encryption.sort()
            # Store network to csv file
            # If MODE is not specified
            if mode == "" and essid != "":
                    outfile.write("\n" + essid + "," + bssid + "," + ' '.join(encryption)+ "," + wpaVersion + "," + nbPackets + ","+dataSize +  "," + gpslat + "," + gpslng + "," + firstTimeSeen + "," + lastTimeSeen)
            elif essid != "" and mode == encryption[0]:
                    outfile.write("\n" + essid + "," + bssid + "," + ' '.join(encryption)+ "," + nbPackets + ","+ dataSize + "," + gpslat + "," + gpslng + "," + firstTimeSeen + "," + lastTimeSeen)
