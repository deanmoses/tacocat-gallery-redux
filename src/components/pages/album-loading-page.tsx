import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';
import { getYearFromPath } from '@src/utils/path-utils';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly path: string;
};

/**
 * Album page that displays a "loading..." spinner
 */
export const AlbumLoadingPage: React.FunctionComponent<ComponentProps> = ({
	path
}) => (
	<Site.Page showFooter={false} year={getYearFromPath(path)}>
		<Site.Header showSiteTitle={false}>
			<Site.PrevButton />
			<Site.UpButton />
			<Site.NextButton />
		</Site.Header>
		<Site.FullPageMessage>
			<p>
				<WaitingSpinner />
			</p>
		</Site.FullPageMessage>
	</Site.Page>
);
