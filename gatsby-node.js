const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;
	// language=GraphQL
	const { data, error } = await graphql(`{
		pages: allMarkdownRemark (filter: {
			frontmatter: {
				path: {
					nin: ["/_"]
				}
			}
		}) {
			nodes {
				frontmatter {
					path
				}
				fields {
					template
					path
				}
			}
		}
	}`);

	if (error)
		console.error(error);

	data.pages.nodes.forEach(({ frontmatter, fields }) => {
		const pth = fields.path || frontmatter.path;
		let nextPath = '',
			prevPath = '';

		if (/\d+$/.test(pth)) {
			nextPath = pth.replace(/\d+$/, $1 => +$1 + 1);
			prevPath = pth.replace(/\d+$/, $1 => +$1 - 1);
		}

		createPage({
			path: pth,
			component: path.resolve(`src/templates/${fields.template || 'read'}.js`),
			context: {
				pathGlob: '**/*' + pth.replace(/^\//g, '') + '**/*',
				parentPath: pth.slice(0, pth.replace(/\/$/, '').lastIndexOf('/')),
				nextPath,
				prevPath,
			},
		});
	});
};
