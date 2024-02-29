#!/bin/bash

# Building React output
sudo yarn install
sudo yarn run build

echo "Deploying to server..."
echo "Finished copying the build files"