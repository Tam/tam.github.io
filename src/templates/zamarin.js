import React from 'react';
import css from '../scss/zamarin.module.scss';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import favicon from '../helpers/favicon';
import setColor from '../helpers/setColor';
import useFitToScreen from '../hooks/useFitToScreen';
import PageLink from '../components/PageLink';

export default ({ data: { content: { html, frontmatter }, parent, prev, next }, location, pageContext }) => {
	useFitToScreen();

	const { pathname: url } = location;
	const back = url.slice(0, url.replace(/\/$/, '').lastIndexOf('/'));

	const color = parent ? parent.frontmatter.color : frontmatter.color;

	const [part, title] = frontmatter.title.split(': ', 2);

	return (
		<>
			<Helmet htmlAttributes={{ class: css.body }}>
				<title>{frontmatter.title} - {parent ? parent.frontmatter.title : ''} - The Fantastic Adventures of Zamarin</title>
				{favicon(parent ? parent.frontmatter.icon : frontmatter.icon)}
				{setColor(color)}
			</Helmet>
			<div className={css.wrap}>
				<div className={css.inner}>
					<header className={css.header}>
						{parent && (
							<h2><a href={back}>{parent.frontmatter.title}</a> &nbsp;&raquo;&nbsp; {part}</h2>
						)}
						<h1>{title || part}</h1>
						<a href={back}>&larr; Back</a>
					</header>
					<article
						className={css.article}
						dangerouslySetInnerHTML={{__html:html}}
					/>
					<footer className={css.footer}>
						{prev ? (
							<PageLink
								href={pageContext.prevPath}
								title={prev.frontmatter.title}
							/>
						) : <span />}
						{next ? (
							<PageLink
								href={pageContext.nextPath}
								title={next.frontmatter.title}
							/>
						) : <span />}
					</footer>
				</div>
			</div>
		</>
	);
};

export const pageQuery = graphql`
	query (
		$path: String!
		$parentPath: String
		$prevPath: String
		$nextPath: String
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
		parent: markdownRemark (fields: { path: { eq: $parentPath } }) {
			frontmatter {
				title
				color
				icon
			}
		}
		prev: markdownRemark (fields: { path: { eq: $prevPath } }) {
			frontmatter {
				title
			}
		}
		next: markdownRemark (fields: { path: { eq: $nextPath } }) {
			frontmatter {
				title
			}
		}
	}
`;
