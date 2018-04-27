#!/bin/bash

#URL the app uses
export APP_URL="http://localhost:1337"

#Basic auth
export BASIC_AUTH_USERNAME=
export BASIC_AUTH_PASSWORD=
export BASIC_AUTH_USERNAME=""
export BASIC_AUTH_PASSWORD=""

#Details of an already existing account used to sign-in
export EXISTING_ACCOUNT_USERNAME=""
export EXISTING_ACCOUNT_PASSWORD=""

#run tests in firefox headless mode, ignore js errors (-e), with screenshots (-S) which save to this directory (-s .)
testcafe "firefox:headless" tests/happy_path.js -e -S -s .