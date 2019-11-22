import React from 'react';
import css from '../scss/read.module.scss';
import {graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import formatDate from '../helpers/formatDate';

export default ({ data: { content: { html, frontmatter } } }) => (
	<>
		<Helmet bodyAttributes={{ class: css.body }}>
			<title>{frontmatter.title}</title>
		</Helmet>
		<h1>{frontmatter.title}</h1>
		<time>Published {formatDate(frontmatter.date)}</time>
		<article dangerouslySetInnerHTML={{__html:html}} />
	</>
);

export const pageQuery = graphql`
	query ($path: String!) {
		content: markdownRemark (frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				title
				date
			}
		}
	}
`;
