/***************************************************************************************************************************************************************
 *
 * Initialise the Rainbow (express server)
 *
 * Server - Wait for a REST response and run HandleResponse
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Restify    = require( 'restify' );
const A11yColor  = require( 'a11ycolor' );


// Check if the user is in verbose mode
if( process.argv.includes( '-v' ) || process.argv.includes( '--verbose' ) ) {
	Log.verboseMode = true;
}


/**
 * HandleResponse - Takes the request and sends back a response
 *
 * @param {Object}   request                   - Information about the client accessing the data
 * @param {Object}   request.params            - Paramaters passed in the URL
 * @param {String}   request.params.toMakeA11y - The color that is to be changed
 * @param {String}   request.params.background - The background color to for the contrast
 * @param {String}   request.params.ratioKey   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
 * @param {String}   request.params.steps      - The step size our function goes up and down the Lightness of HSL.
 * @param {Object}   response                  - Where to send the response
 * @param {Function} Next                      - Mandatory, to complete the response and trigger audit logger
 */
const HandleResponse = ( request, response, Next ) => {

	// Set the variables to their values
	const toMakeA11y = request.params.toMakeA11y;
	const background = request.params.background;
	const ratioKey   = request.params.ratioKey || 'small';
	const steps      = request.params.steps ? request.params.steps / 1 : 0.1;
	const ip         = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

	let message = "";

	// Try to apply the color
	try {
		message = A11yColor( toMakeA11y , background , ratioKey , steps );
		response.send( { color: message } );
	}

	// If there is an error return the error
	catch( error ) {
		message = error.message;
		response.send( { error: message } );
	}

	console.log( `${ new Date().toJSON().slice( 0, 19 ) }: From: ${ ip }; Received: [ ${ toMakeA11y }, ${ background }, ${ ratioKey }, ${ steps } ]; Sent: ${ message };` )

	Next();
}


/**
 * Rainbow - Collect response data and run HandleResponse
 */
const Rainbow = Restify.createServer();


/**
 * Server URL patterns
 */
Rainbow.get( '/rainbow/:toMakeA11y/:background', HandleResponse );
Rainbow.get( '/rainbow/:toMakeA11y/:background/:ratioKey/', HandleResponse );
Rainbow.get( '/rainbow/:toMakeA11y/:background/:ratioKey/:steps', HandleResponse );


/**
 * Start the server
 */
Rainbow.listen( 8080, () => {
	console.info( `🌈🌈🌈  Ready to find the accessible spectrum of light: ${ Rainbow.name } ${ Rainbow.url }/rainbow/` );
});


module.exports = Rainbow;
