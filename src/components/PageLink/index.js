import React from 'react';
import css from './style.module.scss';

export default function PageLink ({ href, title }) {
	const [part, _title] = title.split(': ', 2);

	return (
		<a href={href} className={css.link}>
			{part && _title && <small>{part}</small>}
			<span>{_title || part}</span>
		</a>
	);
}
