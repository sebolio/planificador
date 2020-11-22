#!/bin/bash

set -o errexit

printf "\n[-] **Building** Meteor application bundle into $APP_BUNDLE_FOLDER..\n\n"

mkdir --parents $APP_BUNDLE_FOLDER

cd $APP_SOURCE_FOLDER

meteor build --directory $APP_BUNDLE_FOLDER --server-only
