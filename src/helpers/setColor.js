import React from 'react';

export default function (color) {
	if (!color)
		return null;

	return (
		<style type="text/css">{`
			html {
				--primary: ${color};
			}
		`}</style>
	);
}
