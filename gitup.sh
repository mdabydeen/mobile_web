#!/bin/bash

# File Name: gitup.sh
# Description: Push updates to GitHub Account
# Author: Michael Dabydeen
# Date: 2012-08-01

#set variables
echo "Enter the name of the repo to push: "
read repo

now = date;

#commit

git commit -a 
git commit -m 'half hourly update $now'
git push -u origin $repo
