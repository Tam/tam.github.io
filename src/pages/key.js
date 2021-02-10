import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../helpers/favicon';
import css from '../scss/key.module.scss';
import words from 'an-array-of-english-words';
const wordCount = words.length;

function rand () {
	return Math.floor(Math.random() * wordCount);
}

function pick (length = 5) {
	const indexes = []
		, parts = [];

	while (indexes.length < length) {
		const n = rand();
		if (indexes.indexOf(n) > -1) continue;
		indexes.push(n);
		parts.push(words[n]);
	}

	return parts.join('-');
}

export default function Key () {
	const [len, setLen] = useState(5)
		, [iter, setIter] = useState(false);

	const word = useMemo(() => {
		return pick(len);
	}, [len, iter]);

	const onWordClick = e => {
		const range = document.createRange();
		range.selectNode(e.target);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	};

	const onRandClick = () => setIter(v => !v);

	return (
		<>
			<Helmet bodyAttributes={{ class: css.body }}>
				<title>Key</title>
				{favicon('🔑')}
			</Helmet>

			<div>
				<h1 onClick={onWordClick}>
					{word}
				</h1>
				<input
					type="range"
					min={1}
					max={9}
					defaultValue={5}
					onChange={e => setLen(e.target.value|0)}
				/>
				{len}
				<button onClick={onRandClick}>Generate</button>
			</div>
		</>
	);
}
