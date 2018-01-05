/**
 * The root component of the application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Album from '@src/components/containers/album-container';
import Image from '@src/components/containers/image-container';
import InvalidUrl from '@src/components/pages/invalid-url-page';

/**
 * The root component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router hashType="noslash">
		<Switch>
			<Route exact path="/" render={() => <Album path="/" />} />
			<Route
				exact
				path="/:path(\\d\\d\\d\\d)"
				render={props => <Album path={props.match.params.path as string} />}
			/>
			<Route
				exact
				path="/:path(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
				render={props => <Album path={props.match.params.path as string} />}
			/>
			<Route
				exact
				path="/:path(\\d\\d\\d\\d/\\d\\d\-\\d\\d/*.*)"
				render={props => <Image path={props.match.params.path as string} />}
			/>
			<Route component={InvalidUrl} />
		</Switch>
	</Router>
);
