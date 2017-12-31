/**
 * The root React.js component of the Tacocat Gallery application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ConnectedAlbum from '@src/components/albumcontainer';
import { NotFoundPage } from '@src/components/not-found';

/**
 * The root React.js component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router hashType="noslash">
		<div>
			<header>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/2000">Year</Link>
						</li>
						<li>
							<Link to="/2017/12-25">Day</Link>
						</li>
						<li>
							<Link to="/2999/12-31">Nonexistent Day</Link>
						</li>
						<li>
							<Link to="nosuchroute">404</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Switch>
				<Route exact path="/" render={() => <ConnectedAlbum albumPath="/" />} />
				<Route
					exact
					path="/:year(\\d\\d\\d\\d)"
					render={props => (
						<ConnectedAlbum albumPath={props.match.params.year as string} />
					)}
				/>
				<Route
					exact
					path="/:day(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
					render={props => (
						<ConnectedAlbum albumPath={props.match.params.day as string} />
					)}
				/>
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);
