#!/bin/sh
set echo off
# This script needs to be placed in the directory you want to check adn run from that directory!
# The working directory (= script directory) will be used as 'baseDir'.
# So configuring 'baseDir' by settings-file or cli-argument will be ignored !!"""

# Set script and working directories
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
WORKING_DIR="$(pwd)"
MOUNT_DIR=""

# Initialize VERSION variable and read from 'version.txt' file
VERSION=""

while IFS= read -r line
do
    VERSION="$line"
done < "./_autovalidation/version.txt"

# Read CLI arguments
IMAGE_ARGS="$@"
baseDir=""
projectName=""
# Loop through arguments
while [ $# -gt 0 ]; do
    case "$1" in
        "--baseDir")
            if [ "$2" != "--"* ] && [ -n "$2" ]; then
                baseDir="$2"
                shift # Skip argument value
            fi
            ;;
        "--projectName")
            if [ "$2" != "--"* ] && [ -n "$2" ]; then
                projectName="$2"
                shift # Skip argument value
            fi
            ;;
    esac
    shift # Skip to the next argument
done
# Determine the MOUNT_DIR
if [ -n "$baseDir" ]; then
    MOUNT_DIR="$baseDir"
else
    MOUNT_DIR="$WORKING_DIR"
fi
# Append projectName to IMAGE_ARGS if not provided
if [ -z "$projectName" ]; then
    projectName=$(basename "$WORKING_DIR")
    IMAGE_ARGS="--projectName $projectName $IMAGE_ARGS"
fi


#echo "Running auto-validation v$VERSION"
#echo "Wait..."

# Set paths and image names
LOCALDOCKERARCHIVE_PATH="$SCRIPT_DIR/_autovalidation/auto-validator_dockerimage.tar"
DOCKER_LOCALIMAGE_NAME="auto-validator:$VERSION"
DOCKER_HUBIMAGE_NAME="kennethdekeulenaerkdg/kdg-ti-ui1_auto-validator:$VERSION"

IMAGE_NAME=""

# Check if the image is already locally loaded
echo "Check if local-image exists locally..."
#read -p "Press any key to continue... " -n1 -s
if docker images -q "$DOCKER_LOCALIMAGE_NAME" > /dev/null 2>&1; then
    IMAGE_NAME=$DOCKER_LOCALIMAGE_NAME
else
    echo "Check if hub-image exists locally..."
    #read -p "Press any key to continue... " -n1 -s
    if docker images -q "$DOCKER_HUBIMAGE_NAME" > /dev/null 2>&1; then
        IMAGE_NAME=$DOCKER_HUBIMAGE_NAME
    else
        # Load image from local archive or pull from Docker Hub
        if [ -f "$LOCALDOCKERARCHIVE_PATH" ]; then
            echo "Load image from local docker archive file..."
            #read -p "Press any key to continue... " -n1 -s
            docker load -i "$LOCALDOCKERARCHIVE_PATH"
            IMAGE_NAME=$DOCKER_LOCALIMAGE_NAME
        else
            echo "Pull image from docker hub..."
            #read -p "Press any key to continue... " -n1 -s
            docker pull "$DOCKER_HUBIMAGE_NAME"
            IMAGE_NAME=$DOCKER_HUBIMAGE_NAME
        fi
    fi
fi

echo "Run new container from image..."
#read -p "Press any key to continue... " -n1 -s
#docker run --rm --network host --mount type=bind,src="$MOUNT_DIR",dst="/auto-val-temp/project" $IMAGE_NAME $IMAGE_ARGS
docker run --rm --mount type=bind,src="$MOUNT_DIR",dst="/auto-val-temp/project" $IMAGE_NAME $IMAGE_ARGS


## info: to run image interactive terminal/shell, 'ENTRYPOINT' in Dockerfile needs to be removed!! ##
#docker run --rm -it --mount type=bind,src="$MOUNT_DIR",dst="/auto-val-temp/project" $IMAGE_NAME sh
