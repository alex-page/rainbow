# 🌈 Rainbow   ![Build status](https://travis-ci.org/alex-page/rainbow.svg?branch=master)

> Finds the accessible spectrum of light for your a11y project.

> The Rainbow is a REST API that allows users to send a **colour to be accessible** and the **background colour** and receive an **accessible version of the color** that is as close to the original and passes accessibility contrast. 


## Install

```shell
npm install
```
Then run `npm start` or `npm watch` to start the REST api.


## Getting started
Once the server is started it can now take paramaters through the URL:

```
http://localhost:8080/rainbow/red/blue
http://localhost:8080/rainbow/red/blue/small
http://localhost:8080/rainbow/red/blue/small/0.1
```
The above URL would return a hex value of `{ color: #ffa3a3 }`.


## URL Pattern
The URL pattern is based off the [`A11yColor`](https://www.npmjs.com/package/a11ycolor) module.
```
http://localhost:8080/rainbow/:toMakeA11y/:background/:unitKey/:steps
```

### `toMakeA11y` ( *required* )
The color that is to be made accessible on the background.

### `background` ( *required* )
The background color to test the `toMakeA11y` for the contrast.
This is 

### `ratioKey` ( *default* : `small` )
The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5.

### `steps` ( *default* : `0.1` )
The step size our function is searching for a new color in. The bigger the number the faster the process the rougher the found color. 


## Release History

* v1.0.0 - First release
