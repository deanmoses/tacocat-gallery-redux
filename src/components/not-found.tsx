/**
 * React.js components that renders page for invalid route syntax
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as Site from '@src/components/site';

export const NotFoundPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => (
	<Site.Page showFooter={false}>
		<Site.HeaderTitle />
		<div className="fullPageMessage">
			<p>That's not a valid page.</p>
			<p>
				<a href="#">Go back home?</a>
			</p>
		</div>
	</Site.Page>
);
