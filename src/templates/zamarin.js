import React from 'react';
import css from '../scss/zamarin.module.scss';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import cls from '../helpers/cls';

export default ({ data: { content: { html, frontmatter, fileAbsolutePath } } }) => {
	const isHome = fileAbsolutePath.indexOf('zamarin/index.md') > -1;

	return (
		<>
			<Helmet bodyAttributes={{ class: css.body }}>
				<title>{frontmatter.title}</title>
			</Helmet>
			<div className={css.wrap}>
				<h1 className={cls({ [css.large]: isHome })}>{frontmatter.title}</h1>
				<article dangerouslySetInnerHTML={{__html:html}} />
			</div>
		</>
	);
};

export const pageQuery = graphql`
	query ($path: String!) {
		content: markdownRemark (fields: { path: { eq: $path } }) {
			html
			fileAbsolutePath
			frontmatter {
				title
			}
		}
	}
`;
