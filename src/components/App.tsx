/**
 * Root React.js component of the Tacocat Gallery application
 */

import * as React from 'react';
import {
	HashRouter as Router,
	Route,
	RouteComponentProps,
	Switch,
	Link
} from 'react-router-dom';

/**
 * Root React.js component of the application
 */
export const App: React.StatelessComponent = () => (
	<Router>
		<div>
			<header>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/one">One</Link>
						</li>
						<li>
							<Link to="/two">Two</Link>
						</li>
						<li>
							<Link to="/2000">Year</Link>
						</li>
						<li>
							<Link to="/2000/12-31">Week</Link>
						</li>
						<li>
							<Link to="nosuchroute">404</Link>
						</li>
					</ul>
				</nav>
			</header>

			{/*
                A <Switch> renders the first child <Route> that matches. 
                A <Route> with no path always matches.
            */}
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/one" component={One} />
				<Route exact path="/two" component={Two} />
				<Route exact path="/(\\d\\d\\d\\d)" component={YearAlbumPage} />
				<Route
					exact
					path="/(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
					component={WeekAlbumPage}
				/>
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

const HomePage: React.StatelessComponent<RouteComponentProps<any>> = () => (
	<h1>Home</h1>
);

const One: React.StatelessComponent<RouteComponentProps<any>> = () => (
	<h1>One</h1>
);

const Two: React.StatelessComponent<RouteComponentProps<any>> = () => (
	<h1>Two</h1>
);

const YearAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => <h1>Year</h1>;

const WeekAlbumPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => <h1>Week</h1>;

const NotFoundPage: React.StatelessComponent<RouteComponentProps<any>> = () => (
	<h1>
		Not found: <code>{location.pathname + location.hash}</code>
	</h1>
);
