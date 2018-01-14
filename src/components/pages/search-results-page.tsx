import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';
import { ThumbnailList } from '@src/components/presentation/thumbnail-list';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
	readonly images?: any;
	readonly albums?: any;
};

/**
 * Search page that shows a "No Search Results" page
 */
export const SearchResultsPage: React.StatelessComponent<ComponentProps> = ({
	searchTerms,
	returnPath,
	images,
	albums
}) => {
	let imageThumbs;
	var albumThumbs;
	if (images) {
		imageThumbs = <ThumbnailList items={images} useLongDateAsSummary={true} />;
	}
	if (albums) {
		albumThumbs = <ThumbnailList items={albums} useLongDateAsTitle={true} />;
	}

	return (
		<SearchPageShell searchTerms={searchTerms} returnPath={returnPath}>
			<Site.FullPageMessage>
				{imageThumbs}
				{albumThumbs}
			</Site.FullPageMessage>
		</SearchPageShell>
	);
};
