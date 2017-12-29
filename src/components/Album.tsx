/**
 * React.js components that render the album pages
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

/**
 * React.js component that renders the top level album page
 */
export const RootAlbumPage: React.StatelessComponent = () => (
	<h1>Root Album</h1>
);

/**
 * React.js component that renders year album pages
 */
export const YearAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => <h1>Year</h1>;

/**
 * React.js component that renders week/day/leaf album pages
 */
export const WeekAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => <h1>Week</h1>;
