import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';

/**
 * Album page that displays a "loading..." spinner
 */
export const AlbumLoadingPage: React.StatelessComponent = () => (
	<Site.Page className="albumpage loading">
		<Site.HeaderTitle showTitle={false}>
			<Site.PrevButton />
			<Site.UpButton />
			<Site.NextButton />
		</Site.HeaderTitle>
		<Site.FullPageMessage>
			<WaitingSpinner />
		</Site.FullPageMessage>
	</Site.Page>
);
