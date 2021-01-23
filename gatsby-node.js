const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;
	// language=GraphQL
	const { data, error } = await graphql(`
		{
			pages: allMarkdownRemark {
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
		}
	`);

	if (error)
		console.error(error);

	data.pages.nodes.forEach(({ frontmatter, fields }) => {
		createPage({
			path: fields.path || frontmatter.path,
			component: path.resolve(`src/templates/${fields.template || 'read'}.js`),
		});
	});
};
