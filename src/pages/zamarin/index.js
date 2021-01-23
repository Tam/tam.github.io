import React from 'react';
import css from '../../scss/zamarin.module.scss';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import favicon from '../../helpers/favicon';

export default ({ data: { pages } }) => {
	return (
		<>
			<Helmet htmlAttributes={{ class: css.body }}>
				<title>The Fantastic Adventures of Zamarin</title>
				{favicon()}
			</Helmet>
			<div className={css.wrap}>
				<h1 className={css.large}>
					The Fantastic Adventures of <em>Zamarin</em>
				</h1>

				<div className={css.lists}>
					<ol className={css.contents}>
						{pages.nodes.map(page => (
							<li key={page.path}>
								<a href={'/zamarin' + page.path.split('zamarin', 2)[1].replace('index.md', '')}>
									<span>{page.frontmatter.title}</span>
								</a>
							</li>
						))}
					</ol>
					<ul className={css.details}>
						<li>
							<a href="/zamarin/about">
								About the Author
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export const query = graphql`
	query {
		pages: allMarkdownRemark (
			filter: {
				fileAbsolutePath: {
					regex: "/zamarin\\/(.*)\\/index.md$/"
				}
			}
			sort: {
				fields: [frontmatter___date]
			}
		) {
			nodes {
				path: fileAbsolutePath
				frontmatter {
					title
				}
			}
		}
	}
`;
