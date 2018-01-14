import * as React from 'react';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';
import { SearchLoadingPage } from '@src/components/pages/search-loading-page';
import { SearchErrorPage } from '@src/components/pages/search-error-page';
import { SearchState } from '@src/models/models';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
	readonly errorMessage?: string; // error doing search
	readonly results?: any;
	readonly state?: SearchState;
	readonly fetchIfNeeded?: (searchTerms: string) => void;
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
		// If my connector component has hooked up a method to fetch search results...
		if (!!this.props.fetchIfNeeded) {
			// ...call it
			this.props.fetchIfNeeded(this.props.searchTerms);
		}
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	componentWillReceiveProps(nextProps: ComponentProps) {
		// Have we changed which search terms we're displaying?
		let differentSearchTerms: boolean =
			nextProps.searchTerms !== this.props.searchTerms;
		if (differentSearchTerms) {
			this.props.fetchIfNeeded(nextProps.searchTerms);
		}
	}

	render() {
		console.log(`search render(${this.props.searchTerms})`);
		if (!this.props.state) {
			// Tabula rasa: search screen, ready to type a search query into
			return <SearchPageShell returnPath={this.props.returnPath} />;
		}

		switch (this.props.state) {
			case SearchState.SEARCHING: {
				return (
					<SearchLoadingPage
						searchTerms={this.props.searchTerms}
						returnPath={this.props.returnPath}
					/>
				);
			}
			case SearchState.ERROR: {
				return (
					<SearchErrorPage
						error={this.props.errorMessage}
						searchTerms={this.props.searchTerms}
						returnPath={this.props.returnPath}
					/>
				);
			}
			default: {
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
		}
	}
}
