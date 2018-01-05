import * as React from 'react';
import * as Site from '@src/components/presentation/site';

interface Props {
	readonly imagePath: string;
}

/**
 * Image page.
 */
const ImagePage: React.StatelessComponent<Props> = ({ imagePath }) => (
	<Site.Page className="imagepage">
		<Site.HeaderTitle title="IMAGE" />
		<Site.FullPageMessage>IMAGE PAGE: {imagePath}</Site.FullPageMessage>
	</Site.Page>
);
export default ImagePage;
