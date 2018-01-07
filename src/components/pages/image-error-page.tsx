import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { Icon, Icons } from '@src/components/presentation/icon';
import { FetchError, FetchErrorType } from '@src/models/models';
import { getYearFromPath } from '@src/utils/path-utils';
import Config from '@src/utils/config';

/**
 * Component properties
 */
interface ComponentProps {
	readonly path: string;
	readonly error: FetchError;
}

/**
 * Image page that displays an error -- the only possible errors at this point are about loading the album
 */
const ImageErrorPage: React.StatelessComponent<ComponentProps> = ({
	path,
	error
}) => {
	let errorMessage;
	if (!!error && error.type == FetchErrorType.NotFound) {
		errorMessage = 'Album not found';
	} else {
		errorMessage = 'There was an error attempting to retrieve this album.';
	}
	return (
		<Site.Page className="imagepage" year={getYearFromPath(path)}>
			<Site.HeaderTitle
				title={Config.siteTitle()}
				shortTitle={Config.siteShortTitle()}
				showTitleLink={false}
				showTitle={false}
				showSearch={false}
			/>
			<Site.FullPageMessage>
				<p>{errorMessage}</p>
				<p>
					<a href="#">
						Go back <Icon icon={Icons.HOME} />?
					</a>
				</p>
			</Site.FullPageMessage>
		</Site.Page>
	);
};
export default ImageErrorPage;
