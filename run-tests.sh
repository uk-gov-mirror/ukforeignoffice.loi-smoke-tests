#!/bin/bash

#URL the app uses
export APP_URL="http://localhost:1337"

#Details of an already existing account used to sign-in
export EXISTING_ACCOUNT_USERNAME=""
export EXISTING_ACCOUNT_PASSWORD=""

#Details of an account to be created
export NEW_ACCOUNT_USERNAME=""
export NEW_ACCOUNT_PASSWORD=""

testcafe "firefox" tests/*.js