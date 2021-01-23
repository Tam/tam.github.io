import React from 'react';
import css from '../scss/zamarin.module.scss';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import favicon from '../helpers/favicon';

export default ({ data: { content: { frontmatter, html }, pages }, location, pageContext }) => {
	const { pathname: url } = location;
	const back = url.slice(0, url.replace(/\/$/, '').lastIndexOf('/'));

	return (
		<>
			<Helmet htmlAttributes={{
				class: css.body,
				style: frontmatter.color ? `--primary:${frontmatter.color}` : null,
			}}>
				<title>{frontmatter.title} - The Fantastic Adventures of Zamarin</title>
				{favicon(frontmatter.icon)}
			</Helmet>
			<div className={css.wrap}>
				<div className={css.inner}>
					<header className={css.header}>
						<h1>{frontmatter.title}</h1>
						<a href={back}>&larr; Back</a>
					</header>
					<article
						className={css.article}
						dangerouslySetInnerHTML={{__html:html}}
					/>
					<ul className={css.details}>
						{pages.nodes.map(page => (
							<li key={page.fields.path}>
								<a href={page.fields.path}>
									<span>{page.frontmatter.title}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export const pageQuery = graphql`
	query (
		$path: String!
		$pathGlob: String
	) {
		content: markdownRemark (fields: { path: { eq: $path } }) {
			html
			fileAbsolutePath
			frontmatter {
				title
				color
				icon
			}
		}
		pages: allMarkdownRemark (filter: {
			fields: {
				path: {
					glob: $pathGlob
				}
			}
		}) {
			nodes {
				frontmatter {
					title
				}
				fields {
					path
				}
			}
		}
	}
`;
