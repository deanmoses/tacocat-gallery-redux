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
export const AlbumLoadingPage: React.StatelessComponent<ComponentProps> = ({
	path
}) => (
	<Site.Page showFooter={false} year={getYearFromPath(path)}>
		<Site.HeaderTitle showSiteTitle={false}>
			<Site.PrevButton />
			<Site.UpButton />
			<Site.NextButton />
		</Site.HeaderTitle>
		<Site.FullPageMessage>
			<p>
				<WaitingSpinner />
			</p>
		</Site.FullPageMessage>
	</Site.Page>
);
