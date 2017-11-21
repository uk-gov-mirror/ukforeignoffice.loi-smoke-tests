# fco-legalisation-smoketests
## What is it?
This app is for writing tests to verify the FCO Legalisation application works correctly and as you'd expect in a browser. It's using TestCafe to achieve this

## How do I install?

The testcafe suite will work as long as you are above node v4 (at the time of writing this). To download node, first install HomeBrew

###### Install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

###### Install nvm
```
brew install nvm
```

###### Install latest node version
```
nvm install node
```

###### Install testcafe via npm
```
npm install testcafe -g
```

## How do I run the tests?

###### Run tests in browser
```
testcafe "firefox" tests/*.js
```

###### Run tests in headless browser
```
testcafe "firefox:headless" tests/*.js
```