import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { FetchError } from '@src/models/models';

/**
 * Component properties
 */
interface ComponentProps {
	readonly error: FetchError;
}

/**
 * Album page that displays an error
 */
const AlbumErrorPage: React.StatelessComponent<ComponentProps> = ({
	error
}) => (
	<Site.Page className="albumpage rootalbumtype">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {error.message}</Site.FullPageMessage>
	</Site.Page>
);
export default AlbumErrorPage;
