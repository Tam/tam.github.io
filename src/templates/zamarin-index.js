import React from 'react';
import css from '../scss/zamarin.module.scss';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import favicon from '../helpers/favicon';
import cls from '../helpers/cls';
import setColor from '../helpers/setColor';
import useFitToScreen from '../hooks/useFitToScreen';

export default ({ data: { content: { frontmatter, html }, pages }, location }) => {
	useFitToScreen();

	const { pathname: url } = location;
	const back = url.slice(0, url.replace(/\/$/, '').lastIndexOf('/'));

	return (
		<>
			<Helmet htmlAttributes={{ class: css.body }}>
				<title>{frontmatter.title} - The Fantastic Adventures of Zamarin</title>
				{favicon(frontmatter.icon)}
				{setColor(frontmatter.color)}
			</Helmet>
			<div className={css.wrap}>
				<div className={css.inner}>
					<header className={cls(css.header, css.index)}>
						<h1>{frontmatter.title}</h1>
						<a href={back}>&larr; Back</a>
					</header>
					<article
						className={css.article}
						dangerouslySetInnerHTML={{__html:html}}
					/>
					<ul className={cls(css.details, css.parts)}>
						{pages.nodes.map(page => {
							const [part, title] = page.frontmatter.title.split(': ');

							return (
								<li key={page.fields.path}>
									<a href={page.fields.path}>
										<small>{part}</small>
										<span>{title}</span>
									</a>
								</li>
							);
						})}
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
