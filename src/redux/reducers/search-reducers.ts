//
// The React Redux reducers for searches
//

import * as Actions from '@src/redux/actions/actions';
import { SearchesBySearchTerms, Search, SearchState } from '@src/models/models';

/**
 * A reducer function
 */
export function searchesBySearchTermsReducer(
	searchesBySearchTerms: SearchesBySearchTerms = {},
	action: Actions.ActionTypes
): SearchesBySearchTerms {
	if (!action) {
		return {};
	}

	switch (action.type) {
		/**
		 *  In process of fetching results from server
		 */
		case Actions.ActionTypeKeys.SEARCHING: {
			console.log(action.type, action.searchTerms);

			// Make copy of existing search state (if any) and set its status to 'searching'
			const searchCopy: Search = {
				...searchesBySearchTerms[action.searchTerms],
				...{
					state: SearchState.SEARCHING,
					errorMessage: undefined
				}
			};

			// Make copy of searchesBySearchTerms
			let searchesCopy = { ...searchesBySearchTerms };

			// Add copy of search to copy of searchesBySearchTerms
			searchesCopy[action.searchTerms] = searchCopy;

			// Return copy of searchesBySearchTerms
			return searchesCopy;
		}

		/**
		 * Received search results from server
		 */
		case Actions.ActionTypeKeys.SEARCH_RESULTS_RECEIVED: {
			console.log(action.type, action.searchTerms);

			// Make copy of existing search state (if any) and set its status to 'searching'
			const search: Search = {
				state: SearchState.SUCCESS,
				results: action.searchResults
			};

			// Make copy of searchesBySearchTerms
			let searchesCopy = { ...searchesBySearchTerms };

			// Add copy of search to copy of searchesBySearchTerms
			searchesCopy[action.searchTerms] = search;

			// Return copy of searchesBySearchTerms
			return searchesCopy;
		}

		/**
		 * Received error attempting to fetch search results from server
		 */
		case Actions.ActionTypeKeys.SEARCH_ERRORED: {
			console.log(action.type, action.searchTerms, action.error);

			// Make copy of existing search and set its status to 'error'
			const searchCopy: Search = {
				...searchesBySearchTerms[action.searchTerms],
				...{ state: SearchState.ERROR, errorMessage: action.error.message }
			};

			// Make copy of searchesBySearchTerms
			let searchesCopy = { ...searchesBySearchTerms };

			// Add copy of search to copy of searchesBySearchTerms
			searchesCopy[action.searchTerms] = searchCopy;

			// Return copy of searchesBySearchTermss
			return searchesCopy;
		}

		// Default: don't want to handle this action, return existing state unchanged
		default:
			return searchesBySearchTerms;
	}
}
