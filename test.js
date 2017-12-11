/***************************************************************************************************************************************************************
 *
 * TESTER
 *
 * Running end to end tests
 *
 **************************************************************************************************************************************************************/


'use strict';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// DEPENDENCIES
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const Rainbow    = require('.');
const GraphqlGot = require('graphql-got');


const url   = `http://localhost:8080/rainbow`;
const tests = [];


// Queries to test
const queries = [
	`{ A11yColor( toMakeA11y: "red", background: "blue" ) }`,
	`{ A11yColor( toMakeA11y: "#f00", background: "#f00" ) }`,
	`{ A11yColor( toMakeA11y: "red", background: "blue" ) }`,
	`{ A11yColor( toMakeA11y: "rebeccapurple", background: "cornflowerblue" ) }`,
	`{ A11yColor( toMakeA11y: "#111", background: "#f00" ) }`,
	`{ A11yColor( toMakeA11y: "#1111", background: "#f000" ) }`,
	`{ A11yColor( toMakeA11y: "#f00000", background: "#111111" ) }`,
	`{ A11yColor( toMakeA11y: "rgb( 0, 0, 0 )", background: "rgb( 100, 0, 0 )" ) }`,
	`{ A11yColor( toMakeA11y: "rgba( 0, 0, 0, 1 )", background: "rgba( 100, 100, 0, 1 )" ) }`,
	`{ A11yColor( toMakeA11y: "rgb( 100%, 0%, 0% )", background: "rgb( 100%, 0%, 0% )" ) }`,
	`{ A11yColor( toMakeA11y: "rgba( 100%, 90%, 0%, 0.9 )", background: "rgba( 0%, 5%, 0%, 0.9 )" ) }`,
	`{ A11yColor( toMakeA11y: "hsl( 120, 100%, 50% )", background: "hsl( 60, 20%, 50% )" ) }`,
	`{ A11yColor( toMakeA11y: "hsla( 120, 100%, 50%, 0.9 )", background: "hsla( 60, 20%, 50%, 0.9 )" ) }`,
];


// Add each test into the promise
queries.map( query => {
	tests.push(
		GraphqlGot( url, { query } )
			.catch( error => console.error( `ERROR: ${ error.message }` ) )
	);
});


// Return the results
Promise.all( tests )
	.then( () => {
		console.log( 'Jobs done' );
		process.exit( 0 );
	})
	.catch( error => console.error( `uh oh ${ error }` ) );

