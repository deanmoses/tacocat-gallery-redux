import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
	readonly error?: string;
};

/**
 * Search page that shows an error message
 */
export const SearchErrorPage: React.StatelessComponent<ComponentProps> = ({
	searchTerms,
	returnPath
}) => (
	<SearchPageShell searchTerms={searchTerms} returnPath={returnPath}>
		<Site.FullPageMessage>
			<p>There was an error searching.</p>
			<p>Reload the page and try again.</p>
		</Site.FullPageMessage>
	</SearchPageShell>
);
