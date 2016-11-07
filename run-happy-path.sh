#!/bin/bash
export TEST_URL="http://localhost:1337"
# THIS SECTION ALLOWS YOU TO RUN A SPECIFIC TEST
bundle exec rspec spec/legalisation/features/happy_path_spec.rb
