#!/bin/bash

LOGFILE=/home/pi/uploadlogs/kismetupload.log

#customize the following to suit your needs
HOME_SSID=YOUR_HOME_SSID
HOME_USER=YOUR_HOME_USER
HOME_IP=YOUR_HOME_SERVER_IP
KISMET_STORAGE_PATH=/OUR/KISMET/STORAGE/PATH/

(
    echo "$(date "+%m%d%Y %T") : Starting work"
    wall  "attempting log upload"
    SSID=$(iwgetid -r)
    if [ ${SSID} = "$HOME_SSID" ]; then
        wall "connected to $HOME_SSID - uploading logs"
        rsync --remove-source-files -avzPe "ssh -i /home/pi/.ssh/id_rsa" /home/pi/logs/ $HOME_USER@$HOME_IP:$KISMET_STORAGE_PATH
    fi
    echo error 1>&2 # test stderr

    echo "$(date "+%m%d%Y %T") : Done"
) >& $LOGFILE