import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
};

/**
 * Search page that displays a "loading..." spinner
 */
export const SearchLoadingPage: React.FunctionComponent<ComponentProps> = ({
	searchTerms,
	returnPath
}) => (
	<SearchPageShell searchTerms={searchTerms} returnPath={returnPath}>
		<Site.FullPageMessage>
			<p>Searching...</p>
			<p>
				<WaitingSpinner />
			</p>
		</Site.FullPageMessage>
	</SearchPageShell>
);
