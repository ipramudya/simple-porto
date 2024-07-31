#!/bin/bash

url="https://pramudyatamir.web.app/"
duration=30
count=0

while [ $count -lt $duration ]
do
    curl -X PURGE "$url"
    sleep 1
    count=$((count+1))
done