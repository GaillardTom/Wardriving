#!/bin/bash

LOGFILE=/home/pi/uploadlogs/kismetupload.log

#customize the following to suit your needs
HOME_SSID=YOUR_HOME_SSID
HOME_USER=YOUR_HOME_USER
HOME_IP=YOUR_HOME_SERVER_IP
KISMET_STORAGE_PATH="C:\\Users\\tomga\\Documents\\Kismet\\$(date "+%m%d%Y %T").kismet"
RASPBERRY_PATH="/home/pi/kismetUploads/"
(
    echo "$(date "+%m%d%Y %T") : Starting work"
    wall  "attempting log upload"
    SSID=$(iwgetid -r)
    while [ "$SSID" != "$HOME_SSID" ]; do
        echo "$(date "+%m%d%Y %T") : Not connected to home network, waiting"

        # wait for 10 seconds
        sleep 10

        #Get the SSID of the current network
        SSID=$(iwgetid -r)

    done

    # check if the ssid is the home network
    if [ ${SSID} = "$HOME_SSID" ]; then

        wall "connected to $HOME_SSID - checking if there is a log to upload"

        # kill kismet if it is running
        if pgrep kismet_server; then
            echo "$(date "+%m%d%Y %T") : Killing kismet"

            # kill kismet
            killall kismet_server

            sleep 5 # give it a chance to die
        fi
        DIR = KISMET_STORAGE_PATH
        # check if there is a log to upload
        if [[ $(find ${DIR} -type f  | wc -l) -gt 0 ]];  then
            echo "$(date "+%m%d%Y %T") : Uploading $KISMET_STORAGE_PATH"

            # upload the log
            #scp $KISMET_STORAGE_PATH $HOME_USER@$HOME_IP:/home/$HOME_USER/kismetlogs

            # delete the log
            rsync --remove-source-files -avzPe "ssh -i /home/pi/.ssh/id_rsa" $RASPBERRY_PATH $HOME_USER@$HOME_IP:$KISMET_STORAGE_PATH


            echo "$(date "+%m%d%Y %T") : Upload complete"
            wall "upload complete"
        else
            echo "$(date "+%m%d%Y %T") : No logs to upload"
            wall "no logs to upload"
        fi
       

    fi
    echo error 1>&2 # test stderr

    echo "$(date "+%m%d%Y %T") : Done"
) >& $LOGFILE