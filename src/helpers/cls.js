/**
 * Builds a class string from the given args
 *
 * cls('my-class', { [css.myClass]: a === b }, ['another', { 'hello': false }])
 *
 * @param args
 * @return {string}
 */
export default function cls (...args) {
	const c = [];

	args.forEach(arg => {
		if (typeof arg !== 'object') {
			c.push(arg);
			return;
		}

		if (Array.isArray(arg)) {
			c.concat(...cls(...arg));
			return;
		}

		for (const [key, value] of Object.entries(arg))
			if (!!value)
				c.push(key);
	});

	return c.join(' ');
}
