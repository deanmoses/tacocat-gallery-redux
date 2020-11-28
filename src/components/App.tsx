/**
 * The root component of the application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Album from '@src/components/containers/album-connector';
import Image from '@src/components/containers/image-connector';
import Search from '@src/components/containers/search-connector';
import InvalidUrl from '@src/components/pages/invalid-url-page';
import LogPageView from '@src/components/containers/log-page-view';

/**
 * The root component of the application
 */
export const App: React.FunctionComponent = () => (
	<Router hashType="noslash">
		<div>
			{/* Google Analytics*/}
			<Route
				path="/"
				render={props => <LogPageView path={props.location.pathname} />}
			/>
			<Switch>
				{/* Root gallery / album */}
				<Route exact path="/" render={() => <Album path="/" />} />
				{/* Search without terms or return path */}
				<Route path="/search" exact render={() => <Search />} />
				{/* Search without terms but with return path */}
				<Route
					path="/search/(return:):returnPath?"
					exact
					render={props => (
						<Search returnPath={decode(props.match.params.returnPath)} />
					)}
				/>
				{/* Search with both terms and return path */}
				<Route
					path="/search/:searchTerms?/return::returnPath"
					exact
					render={props => (
						<Search
							searchTerms={decode(props.match.params.searchTerms)}
							returnPath={decode(props.match.params.returnPath)}
						/>
					)}
				/>
				{/* Search with terms but without return path */}
				<Route
					path="/search/:searchTerms"
					exact
					render={props => (
						<Search searchTerms={decode(props.match.params.searchTerms)} />
					)}
				/>
				{/* Albums are any path without a '.' */}
				<Route
					exact
					path="/:albumPath([^.]+)"
					render={props => (
						<Album path={props.match.params.albumPath as string} />
					)}
				/>
				{/* Images are any path WITH something.something.  
			Note that some filenames have periods, so it has to support multiple periods. */}
				<Route
					exact
					path="/:imagePath([^.]+[.].+)"
					render={props => (
						<Image path={props.match.params.imagePath as string} />
					)}
				/>
				<Route component={InvalidUrl} />
			</Switch>
		</div>
	</Router>
);

function decode(uriComponent: string): string {
	return !!uriComponent ? decodeURIComponent(uriComponent) : '';
}
