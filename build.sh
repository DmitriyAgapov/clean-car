#!/bin/bash

# Building React output
yarn install
yarn run build

echo "Deploying to server..."
echo "Finished copying the build files"