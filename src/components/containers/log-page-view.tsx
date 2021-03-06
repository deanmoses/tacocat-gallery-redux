import * as React from 'react';
import { pageview } from 'react-ga';
/**
 * Component properties
 */
interface ComponentProps {
	readonly path: string;
}

const LogPageView: React.FunctionComponent<ComponentProps> = ({ path }) => {
	pageview('/p' + path);
	return null;
};
export default LogPageView;
