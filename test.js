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
const Rainbow = require('.');
const Got     = require( 'got' );


// Test variables
const start           = new Date().getTime();
const TestSpam        = [];
const iterationMax    = 10;
let   completionCount = 0;


// Get the data from the url
const GetData = ( url ) => {
	return new Promise( ( resolve, reject ) => {
		Got( url )
			.then( a11ycolor => {
				completionCount++;
				resolve();
			})
			.catch( error => console.error( error ) );
	})
}


// Run the test a certain number of times
for ( let i = 0; i < iterationMax; i ++ ) {
	TestSpam.push( GetData( `http://localhost:8080/rainbow/red/red` ) );
}


// Run them all asynchronously
Promise.all( TestSpam )
	.then( () => {
		Rainbow.close();
		console.log( `Jobs done: ${ completionCount }` );
		console.log( `Total time: ${ new Date().getTime() - start }` );
	})
	.catch( error => console.error( error ) );
