# Legalisation smoke tests

The __legalisation_smoketests__ is an automated test suite for FCO Legalisation.
Technology wise it is a Ruby project using:
 - [Capybara framework](https://github.com/jnicklas/capybara)
 - [RSpec](http://rspec.info/) (Ruby Gem)
 - Selenium Webdriver (Ruby Gem)
 - [Ruby Bundler](http://bundler.io/) (Ruby Gem)
 - [PhantomJS](http://phantomjs.org/)

It is capable of doing PNG screenshots and HTML snapshots in case of test failure.


## Bootstrap project on Mac
```
You will require a fresh installation of ruby to run these tests.
To uninstall current ruby first check which version is running:
  ruby-v

If ruby exists, uninstall by running the following command (with the appropriate version number):
  rvm remove ruby-1.9.3-p448

To reinstall ruby with the clang compiler:
  rvm install ruby-1.9.3-p448 --with-gcc=clang

To complete the setup:
gem install bundler
gem install capybara-mechanize
brew install phantomjs
bundle install
bundle exec rspec
```

## Run tests locally

./run-all-tests.sh


## Requirements

To run the tests you need some environment variables set: 

 - `TEST_URL` - e.g. http://localhost:1337
 - `TEST_USER` - The user name required for basic auth. Should be left empty if the url you test isn't protected
 - `TEST_PASS` - The password required for basic auth. Should be left empty if the url you test isn't protected

To test localhost for example you would:

    export TEST_URL="http://localhost:1337”
    export TEST_USER=""
    export TEST_PASS=""

    bundle exec rspec
