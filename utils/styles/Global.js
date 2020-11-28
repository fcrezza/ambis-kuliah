import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
		font-family: "Inter", sans-serif;
	}


	/* only show outline when using keyboard */
	.js-focus-visible :focus:not(.focus-visible) {
		outline: none;
	}

	/* customize tippy.js element */
	.tippy-box {
		border-radius: 5px
	}

	.tippy-content {
		padding: 0;
	}
`;
