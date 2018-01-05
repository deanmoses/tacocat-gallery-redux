import * as React from 'react';
import * as Site from '@src/components/presentation/site';

/**
 * Component properties
 */
interface ComponentProps {
	readonly message: string;
}

/**
 * Album page that displays an error
 */
const AlbumErrorPage: React.StatelessComponent<ComponentProps> = ({
	message
}) => (
	<Site.Page className="albumpage rootalbumtype">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {message}</Site.FullPageMessage>
	</Site.Page>
);
export default AlbumErrorPage;
