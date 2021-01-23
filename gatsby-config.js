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
					'gatsby-custom-remark-links',
					'gatsby-remark-copy-relative-linked-files',
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
								getter: node => {
									const isIndex = node.fileAbsolutePath.indexOf('index.md') > -1;

									if (node.fileAbsolutePath.indexOf('zamarin') > -1)
										return isIndex ? 'zamarin-index' : 'zamarin';

									return node.frontmatter.template;
								},
								defaultValue: 'read',
							},
							{
								name: 'path',
								getter: node => {
									if (node.fileAbsolutePath.indexOf('zamarin') > -1)
										return '/zamarin' + node.fileAbsolutePath.split('zamarin', 2)[1].replace(/(\/index)?.md$/, '');

									return null;
								},
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
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-fathom',
			options: {
				trackingUrl: 'stats.tam.sx',
				siteId: 'QDWYW',
			},
		},
		'gatsby-plugin-catch-links',
	],
};
