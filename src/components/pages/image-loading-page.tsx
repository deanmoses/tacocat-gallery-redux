import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import WaitingSpinner from '@src/components/presentation/waiting-spinner';

/**
 * Image page that displays a "loading..." spinner
 */
const ImageLoadingPage: React.StatelessComponent = () => (
	<Site.Page className="imagepage waiting" showFooter={false}>
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
				<WaitingSpinner />
			</Site.FullPageMessage>
		</div>
	</Site.Page>
);
export default ImageLoadingPage;
