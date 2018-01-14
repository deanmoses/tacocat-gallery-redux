import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
};

/**
 * Search page that shows a "No Search Results" page
 */
export const NoSearchResultsPage: React.StatelessComponent<ComponentProps> = ({
	searchTerms,
	returnPath
}) => (
	<SearchPageShell searchTerms={searchTerms} returnPath={returnPath}>
		<Site.FullPageMessage>
			<p>Didn't find anything matching '{searchTerms}'</p>
		</Site.FullPageMessage>
	</SearchPageShell>
);
