import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { FetchError, FetchErrorType } from '@src/models/models';
import { getYearFromPath } from '@src/utils/path-utils';
import Config from '@src/utils/config';
import { HomeIcon } from '@src/components/presentation/icon/icon-home';

/**
 * Component properties
 */
interface ComponentProps {
	readonly path: string;
	readonly error: FetchError;
}

/**
 * Album page that displays an error
 */
export const AlbumErrorPage: React.FunctionComponent<ComponentProps> = ({
	path,
	error
}) => {
	let errorMessage;
	if (error.type == FetchErrorType.NotFound) {
		errorMessage = 'Album not found';
	} else {
		errorMessage = 'There was an error attempting to retrieve this album.';
	}
	return (
		<Site.Page year={getYearFromPath(path)} showFooter={false}>
			<Site.Header
				title={Config.siteTitle()}
				shortTitle={Config.siteShortTitle()}
				showSiteTitle={false}
			/>
			<Site.FullPageMessage>
				<p>{errorMessage}</p>
				<p>
					<a href="#">
						Go back <HomeIcon />?
					</a>
				</p>
			</Site.FullPageMessage>
		</Site.Page>
	);
};
