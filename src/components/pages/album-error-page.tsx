import * as React from 'react';
import * as Site from '@src/components/presentation/site';

interface AlbumErrorPageProps {
	readonly message: string;
}

/**
 * Album page that displays an error
 */
const AlbumErrorPage: React.StatelessComponent<AlbumErrorPageProps> = ({
	message
}) => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false} />
		<Site.FullPageMessage>Error: {message}</Site.FullPageMessage>
	</Site.Page>
);
export default AlbumErrorPage;
