const test = require('ava');

const {getA11yColor} = require('.');

// A test for the clean URL function
test('API returns color', t => {
	t.is(
		getA11yColor({query: {
			colorToBeA11y: '000',
			background: '000'
		}}).a11ycolor,
		'#757575'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: '#000',
			background: '#000'
		}}).a11ycolor,
		'#757575'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'rebeccapurple',
			background: 'cornflowerblue'
		}}).a11ycolor,
		'#3F1F5E'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'rgb( 0, 0, 0 )',
			background: 'rgb( 100, 0, 0 )'
		}}).a11ycolor,
		'#959595'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'rgb( 0, 0, 0 )',
			background: 'rgb( 100, 0, 0 )'
		}}).a11ycolor,
		'#959595'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'rgba( 0, 0, 0, 1 )',
			background: 'rgba( 100, 100, 0, 1 )'
		}}).a11ycolor,
		'#DBDBDB'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'hsl( 120, 100%, 50% )',
			background: 'hsl( 60, 20%, 50% )'
		}}).a11ycolor,
		'#003800'
	);

	t.is(
		getA11yColor({query: {
			colorToBeA11y: 'hsla( 120, 100%, 50%, 0.9 )',
			background: 'hsla( 60, 20%, 50%, 0.9 )'
		}}).a11ycolor,
		'#003800'
	);
});
