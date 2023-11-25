#!/bin/bash

# Stop execution if an error occurs
set -e

# variables
IMAGE_NAME="nutrify-server"
IMAGE_VERSION="latest"
GITHUB_USERNAME="lastdough" 
GITHUB_REPO="Nutrify-Dicoding" 

docker build -t ${IMAGE_NAME}:${IMAGE_VERSION} .

docker run -d -p 9000:9000 ${IMAGE_NAME}

echo "Docker image has been built and run"
