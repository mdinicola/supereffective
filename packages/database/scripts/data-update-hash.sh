#!/bin/bash

# Get the latest commit hash from GitHub API
MD5_SDK=$(curl -s "https://api.github.com/repos/supeffective/dataset/commits/main" | grep -m1 -o '"sha": "[^"]*"' | cut -d'"' -f4)

# Write the MD5 hash to the file

echo "Using data from https://github.com/supeffective/dataset/commit/$MD5_SDK"
echo "https://github.com/supeffective/dataset/commit/$MD5_SDK" > data.head
