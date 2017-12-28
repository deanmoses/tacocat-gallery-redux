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
} from 'react-router-dom'

/**
 * Root React.js component of the application
 */
export const App = () => (
    <Router>
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/one'>One</Link></li>
                        <li><Link to='/two'>Two</Link></li>
                        <li><Link to='/2000'>Year</Link></li>
                        <li><Link to='/2000/12-31'>Week</Link></li>
                        <li><Link to='nosuchroute'>404</Link></li>
                    </ul>
                </nav>
            </header>

            {/*
                A <Switch> renders the first child <Route> that matches. 
                A <Route> with no path always matches.
            */}
            <Switch>
                <Route exact path='/' component={No} />
                <Route exact path='/one' component={One} />
                <Route exact path='/two' component={Two} />
                <Route exact path='/(\\d\\d\\d\\d)' component={Year} />
                <Route exact path='/(\\d\\d\\d\\d/\\d\\d\-\\d\\d)' component={Week} />
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
)

interface NoProps extends RouteComponentProps<any> {}
const No: React.SFC<NoProps> = () => <h1>Home</h1>;

interface OneProps extends RouteComponentProps<any> {}
const One: React.SFC<OneProps> = () => <h1>One</h1>;

interface TwoProps extends RouteComponentProps<any> {}
const Two: React.SFC<TwoProps> = () => <h1>Two</h1>;

interface YearProps extends RouteComponentProps<any> {}
const Year: React.SFC<YearProps> = () => <h1>Year</h1>;

interface WeekProps extends RouteComponentProps<any> {}
const Week: React.SFC<WeekProps> = () => <h1>Week</h1>;

interface NoMatchProps extends RouteComponentProps<any> {}
const NoMatch: React.SFC<NoMatchProps> = () => 
<h1>Not found: <code>{location.pathname + location.hash}</code></h1>;