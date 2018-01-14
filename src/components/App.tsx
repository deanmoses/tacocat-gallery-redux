/**
 * The root component of the application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Album from '@src/components/containers/album-connector';
import Image from '@src/components/containers/image-connector';
import { SearchContainer as Search } from '@src/components/containers/search-container';
import InvalidUrl from '@src/components/pages/invalid-url-page';

/**
 * The root component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router hashType="noslash">
		<Switch>
			<Route exact path="/" render={() => <Album path="/" />} />
			<Route
				path="/search/:terms?/return:returnPath"
				render={() => <Search returnPath="/" />}
			/>
			<Route
				exact
				path="/:albumPath([^.]+)"
				render={props => (
					<Album path={props.match.params.albumPath as string} />
				)}
			/>
			<Route
				exact
				path="/:imagePath([^.]+[.][^.]+)"
				render={props => (
					<Image path={props.match.params.imagePath as string} />
				)}
			/>
			<Route component={InvalidUrl} />
		</Switch>
	</Router>
);
