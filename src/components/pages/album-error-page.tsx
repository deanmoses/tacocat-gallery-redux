import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { FetchError } from '@src/models/models';
import { getYearFromPath } from '@src/utils/path-utils';

/**
 * Component properties
 */
interface ComponentProps {
	readonly path: string;
	readonly error: FetchError;
}

/**
 * Album page that displays an error
 */
export const AlbumErrorPage: React.StatelessComponent<ComponentProps> = ({
	path,
	error
}) => (
	<Site.Page year={getYearFromPath(path)}>
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {error.message}</Site.FullPageMessage>
	</Site.Page>
);
