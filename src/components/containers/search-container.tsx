import * as React from 'react';
import { SearchPageShell } from '@src/components/presentation/search-page-shell';
import { SearchLoadingPage } from '@src/components/pages/search-loading-page';
import { SearchErrorPage } from '@src/components/pages/search-error-page';
import { SearchState } from '@src/models/models';
import { NoSearchResultsPage } from '@src/components/pages/search-results-empty-page';
import { SearchResultsPage } from '@src/components/pages/search-results-page';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath?: string;
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
	 * React.js component lifecycle method.  Invoked immediately after updating occurs. 
	 * This method is not called for the initial render.
	 */
	componentDidUpdate(prevProps: ComponentProps) {
		// Have we changed which search terms we're displaying?
		let differentSearchTerms: boolean =
			prevProps.searchTerms !== this.props.searchTerms;
		if (differentSearchTerms) {
			this.props.fetchIfNeeded(this.props.searchTerms);
		}
	}

	render() {
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
			// Else if successful results
			default: {
				// No images or albums in results: show no search results page
				if (!this.props.results.images && !this.props.results.albums) {
					return (
						<NoSearchResultsPage
							searchTerms={this.props.searchTerms}
							returnPath={this.props.returnPath}
						/>
					);
				} else {
					return (
						<SearchResultsPage
							images={this.props.results.images}
							albums={this.props.results.albums}
							searchTerms={this.props.searchTerms}
							returnPath={this.props.returnPath}
						/>
					);
				}
			}
		}
	}
}
