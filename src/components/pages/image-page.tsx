import * as React from 'react';
import * as Site from '@src/components/presentation/site';

interface ComponentProps {
	readonly path: string;
}

/**
 * Image page.
 */
const ImagePage: React.StatelessComponent<ComponentProps> = ({ path }) => (
	<Site.Page className="imagepage">
		<Site.HeaderTitle title="IMAGE" />
		<Site.FullPageMessage>IMAGE PAGE: {path}</Site.FullPageMessage>
	</Site.Page>
);
export default ImagePage;
