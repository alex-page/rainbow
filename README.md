# 🌈 Rainbow   [![Build Status](https://travis-ci.org/alex-page/rainbow.svg?branch=master)](https://travis-ci.org/alex-page/rainbow)

> Finds the accessible spectrum of light for your a11y project.

> The Rainbow is a GraphQL API that allows users to send a query containing the **colour to be accessible** and **background colour** which returns an **accessible version of the color** that is as close to the original and passes accessibility contrast. 


## Usage
You can use the service by sending a graphql POST request to `http://rainbow.openode.io/rainbow`
```
curl -XPOST -H 'Content-Type:application/graphql' -d '{ A11yColor( toMakeA11y: "red", background: "blue" ) }' http://rainbow.openode.io/rainbow
```

## Install

```shell
npm install
```
Then run `npm start` or `npm watch` to start the REST api.


## Getting started
Once the server is started it can now take POST requests through the URL:

```
curl -XPOST -H 'Content-Type:application/graphql' -d '{ A11yColor( toMakeA11y: "red", background: "blue" ) }' http://localhost:8080/rainbow
```
The above POST would return an object containing: `{ "data": { "A11yColor" : "#FFA3A3" } }`.


## POST Paramaters
The POST request pattern is based off the [`A11yColor`](https://www.npmjs.com/package/a11ycolor) module.
```
A11yColor( toMakeA11y: "red", background: "blue", ratioKey: small )
```

### `toMakeA11y` ( *required* )
The color that is to be made accessible on the background.

### `background` ( *required* )
The background color to test the `toMakeA11y` for the contrast.
This is 

### `ratioKey` ( *default* : `small` )
The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5.


## Release History

* v1.0.1 - Update dependencies
* v1.0.0 - First release
