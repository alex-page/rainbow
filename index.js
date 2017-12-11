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
const Express         = require( 'express' );
const GraphqlHTTP     = require( 'express-graphql' );
const { buildSchema } = require( 'graphql' );
const GetA11yColor    = require( 'a11ycolor' );


/**
 * Construct a schema, using GraphQL schema language
 */
var schema = buildSchema(`
	type Query {
		A11yColor( toMakeA11y: String!, background: String!, ratioKey: String, steps: Float ): String!
	}
`);


/**
 * HandleResponse - Takes the request and sends back a response
 */
const HandleResponse = {

	/**
	 * A11yColor - Gets the accessible color
	 *
	 * @param  {Object} args            - The arguments passed through GraphQL
	 * @param  {String} args.toMakeA11y - The color that is to be changed
	 * @param  {String} args.background - The background color to for the contrast
	 * @param  {String} args.ratioKey   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
	 * @param  {String} args.steps      - The step size our function goes up and down the Lightness of HSL.
	 * @param  {Object} request         - The request object with data from the client
	 * @return {Object} result          - The result of the GetA11yColor() function
	 */
  A11yColor: ( args, request ) => {

    // Set the variables to their values
		const toMakeA11y = args.toMakeA11y;
		const background = args.background;
		const ratioKey   = args.ratioKey || 'small';
		const steps      = args.steps ? args.steps / 1 : 0.1;

		let result = '';

		// Try to apply the color
		try {
			result = GetA11yColor( toMakeA11y , background , ratioKey , steps );
			console.log( `${ new Date().toJSON().slice( 0, 19 ) }: From: ${ request.ip }; Received: [ ${ toMakeA11y }, ${ background }, ${ ratioKey }, ${ steps } ]; Sent: ${ result };` );
			return result;
		}

		// If there is an error return the error
		catch( error ) {
			console.log( `${ new Date().toJSON().slice( 0, 19 ) }: From: ${ request.ip }; Received: [ ${ toMakeA11y }, ${ background }, ${ ratioKey }, ${ steps } ]; Error: ${ error.message };` )
			throw new Error( error );
		}
  }
};


/**
 * Start the server on /rainbow
 */
const Rainbow = Express();
Rainbow.use( '/rainbow', GraphqlHTTP({
	schema: schema,
	rootValue: HandleResponse,
}));


// Listen on the port
const PORT = process.env.PORT || 8080;
Rainbow.listen( PORT, () => {
	console.info( `🌈🌈🌈  Ready to find the accessible spectrum of light: localhost:${ PORT }/rainbow` );
});


module.exports = Rainbow;
