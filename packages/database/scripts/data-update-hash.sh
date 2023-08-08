#!/bin/bash

# Define the repository and branch
REPO=itsjavi/supereffective-assets
BRANCH=main

# Get the latest commit hash from GitHub API
MD5=$(curl -s "https://api.github.com/repos/$REPO/commits/$BRANCH" | grep -m1 -o '"sha": "[^"]*"' | cut -d'"' -f4)

# Write the MD5 hash to the file
echo "Using data from https://github.com/itsjavi/supereffective-assets/commit/$MD5"
echo "https://github.com/itsjavi/supereffective-assets/commit/$MD5" > data.head
