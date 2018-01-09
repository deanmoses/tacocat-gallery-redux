//
// Base icon component
//
// Most or all of these icons are from Bootstrap, but this guy reimplemented them as SVGs:
// https://leungwensen.github.io/svg-icon/#bootstrap
//

import * as React from 'react';

/**
 * Child icon properties
 */
export type IconProps = {
	readonly onClick?: (x: any) => void;
};

/**
 * Icon component properties
 */
type ComponentProps = {
	readonly path: string;
	readonly viewBox?: string;
	readonly width?: string;
	readonly height?: string;
	readonly onClick?: (x: any) => void;
};

/**
 * Icon component
 */
export const Icon: React.StatelessComponent<ComponentProps> = ({
	path,
	viewBox = '0 0 20 20', // The viewBox is tuned to work with the Entypo icon set http://www.entypo.com/.  Other icon sets can be used, but I may have to change the viewBox
	height = '1em',
	width = '1em',
	onClick
}) => {
	const styles = {
		svg: {
			display: 'inline-block',
			verticalAlign: 'middle',
			position: 'relative' as 'relative',
			width: width,
			height: height,
			bottom: '0.125em'
		},
		path: {
			fill: 'currentColor'
		}
	};

	return (
		<svg style={styles.svg} viewBox={viewBox} onClick={onClick}>
			<path style={styles.path} d={path} />
		</svg>
	);
};
