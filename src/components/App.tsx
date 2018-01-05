/**
 * The root component of the application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Album from '@src/components/containers/album-container';
import Image from '@src/components/pages/image-page';
import NotFoundPage from '@src/components/pages/not-found-page';

/**
 * The root component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router hashType="noslash">
		<Switch>
			<Route exact path="/" render={() => <Album albumPath="/" />} />
			<Route
				exact
				path="/:path(\\d\\d\\d\\d)"
				render={props => (
					<Album albumPath={props.match.params.path as string} />
				)}
			/>
			<Route
				exact
				path="/:path(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
				render={props => (
					<Album albumPath={props.match.params.path as string} />
				)}
			/>
			<Route
				exact
				path="/:path(\\d\\d\\d\\d/\\d\\d\-\\d\\d/*.*)"
				render={props => (
					<Image imagePath={props.match.params.path as string} />
				)}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
);
