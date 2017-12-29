/**
 * Root React.js component of the Tacocat Gallery application
 */

import * as React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as Album from '@src/components/Album';
import { NotFoundPage } from '@src/components/NotFound';

/**
 * Root React.js component of the application
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
				<Route exact path="/" component={Album.RootAlbumPage} />
				<Route exact path="/(\\d\\d\\d\\d)" component={Album.YearAlbumPage} />
				<Route
					exact
					path="/(\\d\\d\\d\\d/\\d\\d\-\\d\\d)"
					component={Album.WeekAlbumPage}
				/>
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);
