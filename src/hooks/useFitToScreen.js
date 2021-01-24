import { useEffect } from 'react';
import debounce from '../helpers/debounce';

export default function useFitToScreen () {
	useEffect(() => {
		const onResize = debounce(() => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, 15);

		onResize();

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);
}
