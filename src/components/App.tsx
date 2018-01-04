/**
 * The root component of the application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Album from '@src/components/containers/album-container';
import { NotFoundPage } from '@src/components/pages/not-found-page';

/**
 * The root component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router hashType="noslash">
		<Switch>
			<Route exact path="/" render={() => <Album albumPath="/" />} />
			<Route exact path="/home" render={() => <Home />} />
			<Route
				exact
				path="/:year(\\d\\d\\d\\d)"
				render={props => (
					<Album albumPath={props.match.params.year as string} />
				)}
			/>
			<Route
				exact
				path="/:day(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
				render={props => <Album albumPath={props.match.params.day as string} />}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	</Router>
);

/**
 * Home Page component
 */
const Home: React.StatelessComponent = () => (
	<header>
		<nav>
			<ul>
				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/">Root Album</Link>
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
);
