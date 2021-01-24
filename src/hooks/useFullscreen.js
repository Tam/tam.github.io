import { useEffect } from 'react';

export default function useFullscreen () {
	useEffect(() => {
		const body = document;
		const onBodyClick = () => {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		};

		body.addEventListener('click', onBodyClick);

		return () => body.removeEventListener('click', onBodyClick);
	}, []);
}
