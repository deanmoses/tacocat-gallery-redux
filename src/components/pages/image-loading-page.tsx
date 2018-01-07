import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';
import { getYearFromPath } from '@src/utils/path-utils';

/**
 * Component properties
 */
type ComponentProps = {
	readonly path: string;
};

/**
 * Image page that displays a "loading..." spinner
 */
export const ImageLoadingPage: React.StatelessComponent<ComponentProps> = ({
	path
}) => (
	<Site.Page
		className="imagepage"
		year={getYearFromPath(path)}
		showFooter={false}
	>
		<Site.HeaderTitle title="" showTitle={false} showSearch={false} />
		<div className="photo-body">
			<section className="col-md-3">
				<h2 className="hidden">Caption</h2>
				<div className="caption" />
			</section>
			<section className="col-md-9">
				<h2 className="hidden">Photo</h2>
				<Site.HeaderButtons>
					<Site.PrevButton />
					<Site.UpButton />
					<Site.NextButton />
				</Site.HeaderButtons>
			</section>
			<Site.FullPageMessage>
				<p>
					<WaitingSpinner />
				</p>
			</Site.FullPageMessage>
		</div>
	</Site.Page>
);
