import * as React from 'react';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';
import { SearchLoadingPage } from '@src/components/pages/search-loading-page';
import { SearchErrorPage } from '@src/components/pages/search-error-page';
//import { ThumbnailList } from '@src/components/presentation/thumbnail-list';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
	readonly error?: string; // error doing search
	readonly results?: any;
	readonly doSearch?: Function;
};

/**
 * Search container component: manages search state, selects right search page to render
 */
export class SearchContainer extends React.Component<ComponentProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		//this.props.fetchIfNeeded(this.props.path);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	// componentWillReceiveProps(nextProps: ComponentProps) {
	// 	// Have we changed which album we're displaying?
	// 	let differentAlbum: boolean = nextProps.path !== this.props.path;
	// 	if (differentAlbum) {
	// 		this.props.fetchIfNeeded(nextProps.path);
	// 	}
	// }

	render() {
		// No state = no search results
		if (!this.props.results && !this.props.error) {
			// Tabula rasa: search screen, ready to type a search query into
			if (!this.props.searchTerms) {
				return <SearchPageShell returnPath={this.props.returnPath} />;
			} else {
				// Else search terms have been typed in.  Show waiting page
				return (
					<SearchLoadingPage
						searchTerms={this.props.searchTerms}
						returnPath={this.props.returnPath}
					/>
				);
			}
		} else if (this.props.error) {
			return (
				<SearchErrorPage
					searchTerms={this.props.searchTerms}
					returnPath={this.props.returnPath}
					error={this.props.error}
				/>
			);
		} else if (this.props.results) {
			// Else if successful results
			// No images or albums in results: show no search results page
			if (!this.props.results.images && !this.props.results.albums) {
				return null; //<NoResultsPage searchTerms={this.props.searchTerms} returnPath={this.props.returnPath} />
			} else {
				return null;
				// let images:any = '';
				// let albums:any = '';
				// if (this.props.results.images) {
				// 	images = <ThumbnailList items={this.props.results.images} useLongDateAsSummary={true}/>;
				// }
				// if (this.props.results.albums) {
				// 	albums = <ThumbnailList items={this.props.results.albums} useLongDateAsTitle={true}/>;
				// }
				// return (
				// 	null//<ResultsPage searchTerms={this.props.searchTerms} returnPath={this.props.returnPath} images={images} albums={albums} />
				// );
			}
		}

		return null;
	}
}
