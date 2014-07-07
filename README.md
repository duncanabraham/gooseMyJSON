# gooseMyJSON

A simple application to read a remote API and create a Mongoose style model from the resulting JSON.  

Manually creating these model files from an established API can take some time so this was just an exercise
in playing with Sails.JS and a simple tool to save time and effort when building applications.


## Installation

After pulling the Git repository you'll need to:

```
    npm install
    bower install
```


## Running gooseMyJSON

From the console run:

```
    sails lift
```

This will start the application and make it available on port 1337 (sails.js default port).  Browsing to
`http://localhost:1337/` will open a page showing a URL entry box and a "Get Data" button.

Enter the FQDN of your API endpoint then press the green button.  All being well gooseMyJSON will go off
and read data from your API and attempt to convert it to a data structure based on the values received.


## Data Type Analysis

* If a value can be converted to a date and has a - or / and more than 7 characters, I'll assume it's a Date.
* If a value equals 'true' or 'false' I'll assume Boolean.
* Anything else, including nulls, will be taken to be a String.


