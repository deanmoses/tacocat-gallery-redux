import * as React from 'react';

/**
 * Waiting spinner component, to be shown while pages load
 */
type ComponentState = {
	showSpinner: boolean;
	timeout?: any; // 'any' because it's a differently typed think in Node than in browser
};
export default class WaitingSpinner extends React.Component<
	any,
	ComponentState
> {
	state: ComponentState = {
		showSpinner: false
	};

	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: any, state: ComponentState) {
		super(props, state);

		// Don't show spinner immediately;
		// that's annoying on fast page transitions.
		//this.state = {showSpinner: false};

		// Set timer to show spinner after a while
		this.state.timeout = setTimeout(() => {
			this.setState({ showSpinner: true });
		}, 200);
	}

	componentWillUnmount() {
		if (this.state.timeout) {
			clearTimeout(this.state.timeout);
		}
	}

	render() {
		if (this.state && !this.state.showSpinner) {
			return null;
		}

		return (
			<svg
				className="lds-camera"
				width="200px"
				height="200px"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
				style={{ background: 'none' }}
			>
				<g transform="translate(50,50)">
					<g transform="scale(0.8)">
						<g transform="translate(-50,-50)">
							<g transform="rotate(336.033 50 50)">
								<animateTransform
									attributeName="transform"
									type="rotate"
									repeatCount="indefinite"
									values="360 50 50;0 50 50"
									keyTimes="0;1"
									dur="4.5s"
									keySplines="0.5 0.5 0.5 0.5"
									calcMode="spline"
								/>
								<path
									fill="#d7d7d7"
									d="M54.3,28.1h34.2c-4.5-9.3-12.4-16.7-21.9-20.8L45.7,28.1L54.3,28.1L54.3,28.1z"
								/>
								<path
									fill="#dbdbdb"
									d="M61.7,7.3C51.9,4,41.1,4.2,31.5,8.1v29.5l6.1-6.1L61.7,7.3C61.7,7.3,61.7,7.3,61.7,7.3z"
								/>
								<path
									fill="#e0e0e0"
									d="M28.1,11.6c-9.3,4.5-16.7,12.4-20.8,21.9l20.8,20.8v-8.6L28.1,11.6C28.1,11.6,28.1,11.6,28.1,11.6z"
								/>
								<path
									fill="#e4e4e4"
									d="M31.5,62.4L7.3,38.3c0,0,0,0,0,0C4,48.1,4.2,58.9,8.1,68.5h29.5L31.5,62.4z"
								/>
								<path
									fill="#e9e9e9"
									d="M45.7,71.9H11.5c0,0,0,0,0,0c4.5,9.3,12.4,16.7,21.9,20.8l20.8-20.8H45.7z"
								/>
								<path
									fill="#ededed"
									d="M62.4,68.5L38.3,92.6c0,0,0,0,0,0c9.8,3.4,20.6,3.1,30.2-0.8V62.4L62.4,68.5z"
								/>
								<path
									fill="#f1f1f1"
									d="M71.9,45.7v8.6v34.2c0,0,0,0,0,0c9.3-4.5,16.7-12.4,20.8-21.9L71.9,45.7z"
								/>
								<path
									fill="#f6f6f6"
									d="M91.9,31.5C91.9,31.5,91.9,31.5,91.9,31.5l-29.5,0l0,0l6.1,6.1l24.1,24.1c0,0,0,0,0,0 C96,51.9,95.8,41.1,91.9,31.5z"
								/>
							</g>
						</g>
					</g>
				</g>
			</svg>
		);
	}
}
