const React = require('react')
	, favicon = require('./src/helpers/favicon').default;

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
	const headComponents = getHeadComponents();
	headComponents.push(favicon());
	replaceHeadComponents(headComponents);
}
