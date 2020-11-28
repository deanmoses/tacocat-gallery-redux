import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as Site from '@src/components/presentation/site';

/**
 * Page when the URL is invalid
 */
export const InvalidUrlPage: React.FunctionComponent<
	RouteComponentProps<any>
> = () => (
	<Site.Page showFooter={false}>
		<Site.Header />
		<div className="fullPageMessage">
			<p>That's not a valid URL.</p>
			<p>
				<a href="#">Go back home?</a>
			</p>
		</div>
	</Site.Page>
);
export default InvalidUrlPage;
