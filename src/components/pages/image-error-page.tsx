import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Icon, Icons } from '@src/components/presentation/icon';
import { FetchError } from '@src/models/models';

/**
 * Component properties
 */
interface ComponentProps {
	readonly error: FetchError;
}

/**
 * Image page that displays an error -- the only possible errors at this point are about loading the album
 */
const ImageErrorPage: React.StatelessComponent<ComponentProps> = () => (
	<Site.Page className="imagepage">
		<Site.HeaderTitle
			title="Album Not Found"
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
export default ImageErrorPage;
