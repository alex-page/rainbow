const a11ycolor = require('a11ycolor');
const color = require('color');

const getColor = colorValue => {
	if (colorValue === 'transparent') {
		return null;
	}

	if (/^[A-Fa-f0-9]{3,6}$/.test(colorValue)) {
		colorValue = '#' + colorValue;
	}

	try {
		return color(colorValue).hex();
	} catch (error) {
		return null;
	}
};

const getA11yColor = request => {
	const {colorToBeA11y, background} = request.query;

	const a11y = getColor(colorToBeA11y);
	const bg = getColor(background);

	return {
		a11ycolor: a11ycolor(a11y, bg)
	};
};

module.exports = (request, response) => {
	const data = getA11yColor(request);
	if (!data) {
		return;
	}

	response.setHeader('Content-Type', 'application/json');
	response.setHeader('Cache-Control', 'public, max-age=86400');
	response.send(data);
};

module.exports.getA11yColor = getA11yColor;
