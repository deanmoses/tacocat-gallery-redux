import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Album } from '@src/models/models';
import Config from '@src/utils/config';
import { HomeIcon } from '@src/components/presentation/icon-home';

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
	<Site.Page className="imagepage" year={album.year}>
		<Site.Header
			href={album.href}
			title={Config.siteTitle()}
			shortTitle={Config.siteShortTitle()}
			showSiteTitle={false}
		/>
		<Site.FullPageMessage>
			<p>Image not found.</p>
			<p>
				<a href="#">
					Go back <HomeIcon />?
				</a>
			</p>
		</Site.FullPageMessage>
	</Site.Page>
);
export default ImageNotFoundPage;
