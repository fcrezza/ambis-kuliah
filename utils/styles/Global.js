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

	.customContent {
	  position: absolute;
	      inset: 10% 40px auto 50%;
	      border: 1px solid rgb(204, 204, 204);
	      background: rgb(255, 255, 255);
	      overflow: unset;
	      border-radius: 20px;
	      outline: none;
	      padding: 0px;
	      width: 650px;
	      transform: translateX(-50%);

	      @media (max-width: 768px) {
	      	top: 0;
	      	bottom: 0;
	      	border: 0;
	      	min-height: 100%;
	      	border-radius: 0;
	      	width: 100%;
	      }
	}

	.customOverlay {
	  position: fixed;
	      inset: 0px;
	      background-color: rgba(255, 255, 255, 0.75);
	      overflow-y: auto;
	  }
	}
`;
