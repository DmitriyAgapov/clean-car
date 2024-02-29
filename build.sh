#!/bin/bash

# Building React output
sudo yarn install
sudo yarn run build
sudo chown -R gitlab-runner:gitlab-runner build/ node_modules/ 

echo "Deploying to server..."
echo "Finished copying the build files"