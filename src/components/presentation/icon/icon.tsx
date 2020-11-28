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
	/**
	 * Title to show on icon, for accessibility
	 */
	readonly title?: string;
	readonly onClick?: (x: any) => void;
};

/**
 * Icon component properties
 */
type ComponentProps = {
	readonly onClick?: (x: any) => void;
	readonly path: string;
	readonly viewBox?: string;
	readonly width?: string;
	readonly height?: string;
	readonly title?: string;
};

/**
 * Icon component
 */
export const Icon: React.FunctionComponent<ComponentProps> = ({
	path,
	viewBox = '0 0 20 20', // The viewBox is tuned to work with the Entypo icon set http://www.entypo.com/.  Other icon sets can be used, but I may have to change the viewBox
	height = '1em',
	width = '1em',
	onClick,
	title
}) => {
	const styles: any = {
		svg: {
			width: width,
			height: height
		},
		path: {
			fill: 'currentColor'
		}
	};
	const titleElement = !title ? null : <title>{title}</title>;
	return (
		<svg
			className="icon"
			style={styles.svg}
			viewBox={viewBox}
			onClick={onClick}
		>
			{titleElement}
			<path style={styles.path} d={path} />
		</svg>
	);
};
