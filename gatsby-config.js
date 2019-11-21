module.exports = {
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-use-frontmatter-path',
					'gatsby-custom-remark',
				],
			},
		},
		{
			resolve: 'gatsby-plugin-node-fields',
			options: {
				descriptors: [
					{
						predicate: node => node.internal.type === 'MarkdownRemark',
						fields: [
							{
								name: 'template',
								getter: node => node.frontmatter.template,
								defaultValue: 'read',
							}
						],
					}
				],
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'imgs',
				path: `${__dirname}/src/imgs`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'content',
				path: `${__dirname}/content`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'tam',
				short_name: 'tam',
				start_url: '/',
				background_color: '#201e1c',
				theme_color: '#201e1c',
				display: 'minimal-ui',
				// icon: 'src/imgs/gatsby-icon.png', // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	],
};
