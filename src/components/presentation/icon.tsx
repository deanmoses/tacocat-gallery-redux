//
// Icon component
//

import * as React from 'react';

/**
 * Icon SVGs, taken from the Entypo icon set http://www.entypo.com/
 */
export enum Icons {
	HOME = 'M18.672 11h-1.672v6c0 0.445-0.194 1-1 1h-4v-6h-4v6h-4c-0.806 0-1-0.555-1-1v-6h-1.672c-0.598 0-0.47-0.324-0.060-0.748l8.024-8.032c0.195-0.202 0.451-0.302 0.708-0.312 0.257 0.010 0.513 0.109 0.708 0.312l8.023 8.031c0.411 0.425 0.539 0.749-0.059 0.749z',
	CHEVRON_LEFT = 'M12.452 4.516c0.446 0.436 0.481 1.043 0 1.576l-3.747 3.908 3.747 3.908c0.481 0.533 0.446 1.141 0 1.574-0.445 0.436-1.197 0.408-1.615 0-0.418-0.406-4.502-4.695-4.502-4.695-0.223-0.217-0.335-0.502-0.335-0.787s0.112-0.57 0.335-0.789c0 0 4.084-4.287 4.502-4.695s1.17-0.436 1.615 0z,',
	CHEVRON_RIGHT = 'M9.163 4.516c0.418 0.408 4.502 4.695 4.502 4.695 0.223 0.219 0.335 0.504 0.335 0.789s-0.112 0.57-0.335 0.787c0 0-4.084 4.289-4.502 4.695-0.418 0.408-1.17 0.436-1.615 0-0.446-0.434-0.481-1.041 0-1.574l3.747-3.908-3.747-3.908c-0.481-0.533-0.446-1.141 0-1.576s1.197-0.409 1.615 0z',
	SEARCH = 'M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z',
	STAR = 'M10,1.3l2.388,6.722H18.8l-5.232,3.948l1.871,6.928L10,14.744l-5.438,4.154l1.87-6.928L1.199,8.022h6.412  L10,1.3z'
}

/**
 * Icon component properties
 */
interface IconProps {
	readonly icon: Icons;
	readonly color?: string;
	readonly onClick?: (x: any) => any;
}

/**
 * Icon component
 */
export class Icon extends React.Component<IconProps> {
	constructor(props: IconProps) {
		super(props);
		this.click = this.click.bind(this);
	}

	render() {
		const styles = {
			svg: {
				display: 'inline-block',
				verticalAlign: 'middle',
				position: 'relative' as 'relative',
				width: '1.2em',
				height: '1.25em',
				bottom: '0.125em'
			},
			path: {
				fill: 'currentColor'
			}
		};

		return (
			<svg
				style={styles.svg}
				viewBox="0 0 20 20" // The viewBox is tuned to work with the Entypo icon set http://www.entypo.com/.  Other icon sets can be used, but I may have to change the viewBox
			>
				<path style={styles.path} d={this.props.icon} />
			</svg>
		);
	}

	click(x: any) {
		if (this && this.props.onClick) {
			this.props.onClick(x);
		}
	}
}
