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
const test            = [];


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
test.push( GetData( `${ Rainbow.url }/rainbow/red/red` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/red/blue` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/rebeccapurple/cornflowerblue` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/#111/#f00` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/#1111/#f000` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/#f00000/#111111` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/rgb( 0, 0, 0 )/rgb( 100, 0, 0 )` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/rgb( 100%, 0%, 0% )/rgb( 100%, 0%, 0% )` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/rgba( 100%, 90%, 0%, 0.9 )/rgba( 0%, 5%, 0%, 0.9 )` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/hsl( 120, 100%, 50% )/hsl( 60, 20%, 50% )` ) );
test.push( GetData( `${ Rainbow.url }/rainbow/hsla( 120, 100%, 50%, 0.9 )/hsla( 60, 20%, 50%, 0.9 )` ) );


// Run them all asynchronously
Promise.all( test )
	.then( () => {
		Rainbow.close();
		console.log( `Total time: ${ new Date().getTime() - start }` );
	})
	.catch( error => console.error( error ) );
