#!/bin/bash

#change these to fit your needs
HOME_FOLDER="/home/serveruser/"

KLOGS="/PATH/TO/KISMET/LOGS"
CSVS="/PATH/TO/STORE/CONVERTED/CSV/LOGS"
ARCHIVE="/PATH/TO/ARCHIVE/KISMET/LOGS"

DESKTOP_USER="DESKTOP_USER_NAME"
DESKTOP_IP="DESKTOP_IP"
DESKTOP_LOG_STORAGE="/PATH/TO/DESKTOP/LOG/STORAGE"



#check to see if KLOGS is empty, exit if so
if [ -z "$(ls -A $KLOGS)" ]; then
    echo "No logs! Exiting script"
    exit 1
else
    # Define a timestamp function
    timestamp() {
      date +"%Y%m%d-%H%M%S" # current time
    }

    echo "Kismet SQL Logs"
    echo "Current time is $(timestamp)"

    #make to_compress dir
    mkdir "$KLOGS/to_compress"

    for f in $KLOGS/*.kismet ; do
        b=${f%.kismet}
        if [ -f "$b.csv" ] ; then echo "$b.csv exists" ; else
           kismetdb_to_wiglecsv --in $b.kismet --out $b.csv ; fi
        if [ -f "$b.kml" ] ; then echo "$b.kml exists" ; else
            kismetdb_to_kml --in $b.kismet --out $b.kml ; fi
        echo "archiving $b.kismet"
        mv $b.kismet $ARCHIVE
        cp $b.csv "$KLOGS/to_compress/"
    done

    #compress files for wigle upload
    echo "Compressing files in to_compress"
    compressedfile=wardriving_logs_for_wigle-$(timestamp)
    cd "$KLOGS/to_compress"
    tar -czvf "$KLOGS/$compressedfile.tar.gz" *

    #delete to_compress folder and contents
    rm -rf "$KLOGS/to_compress"

    #move to existing directory (to fix rsync $PWD bug/error)
    cd "$KLOGS"

    #backup csv,kml,and tar.gz files to desktop
    rsync --remove-source-files -avzPe "ssh -i $HOME_FOLDER.ssh/id_rsa" $KLOGS*.csv $DESKTOP_USER@$DESKTOP_IP:$DESKTOP_LOG_STORAGE/csv/
    rsync --remove-source-files -avzPe "ssh -i $HOME_FOLDER.ssh/id_rsa" $KLOGS*.kml $DESKTOP_USER@$DESKTOP_IP:$DESKTOP_LOG_STORAGE/kml/
    rsync --remove-source-files -avzPe "ssh -i $HOME_FOLDER.ssh/id_rsa" $KLOGS*.tar.gz $DESKTOP_USER@$DESKTOP_IP:$DESKTOP_LOG_STORAGE/compressed/
fi