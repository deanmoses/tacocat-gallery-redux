/**
 * React.js components that renders page for invalid route syntax
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page, HeaderTitle } from '@src/components/Site';

export const NotFoundPage: React.StatelessComponent<
	RouteComponentProps<any>
> = () => (
	<Page showFooter={false}>
		<HeaderTitle />
		<div className="fullPageMessage">
			<p>That's not a valid page.</p>
			<p>
				<a href="#">Go back home?</a>
			</p>
		</div>
	</Page>
);
