import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/models/album';
import { Icon, Icons } from '@src/components/presentation/icon';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}

/**
 * Image not found page
 */
const ImageNotFoundPage: React.StatelessComponent<ComponentProps> = ({
	album
}) => (
	<Site.Page className="imagepage loading">
		<Site.HeaderTitle
			href={album.href}
			title={'Image Not Found'}
			showTitle={false}
			showSearch={false}
		/>
		<Site.FullPageMessage>
			<a href="#">
				Go back <Icon icon={Icons.HOME} />?
			</a>
		</Site.FullPageMessage>
	</Site.Page>
);
export default ImageNotFoundPage;
