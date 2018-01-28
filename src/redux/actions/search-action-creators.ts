//
// These are Redux Action builders: helper functions to create Actions
//

import { RootState } from '@src/redux/reducers/root-state';
import Config from '@src/utils/config';
import {
	ActionTypeKeys,
	Searching,
	SearchResultsReceived,
	SearchErrored
} from '@src/redux/actions/actions';
import { getSearchResults } from '@src/redux/selectors/search-selectors';
import { FetchErrorImpl } from '@src/models/models';

/**
 * Search if needed
 */
export function searchIfNeeded(searchTerms: string) {
	console.log(`searchIfNeeded(${searchTerms})`);
	return function(dispatch: Function, getState: Function) {
		if (shouldFetch(getState(), searchTerms)) {
			return dispatch(fetchSearchResults(searchTerms));
		}
	};
}

function shouldFetch(rootState: RootState, searchTerms: string): boolean {
	const searchResult = getSearchResults(rootState, searchTerms);
	// fetch even if we have results.  TODO: in future, only get if we haven't gotten the latest in a few minutes
	const shouldFetch = !!searchTerms && (!searchResult || !!searchResult);
	console.log(`shouldFetch()?`, shouldFetch);
	return shouldFetch;
}

function fetchSearchResults(searchTerms: string) {
	return (dispatch: Function) => {
		console.log('fetchSearchResults()');
		dispatch(searching(searchTerms));

		return fetch(Config.searchUrl(searchTerms))
			.then(handleErrors)
			.then(response => response.json())
			.then(json => dispatch(receiveSearchResults(searchTerms, json)))
			.catch(error => dispatch(errorSearch(searchTerms, error)));
	};
}

function handleErrors(response: Response): Response {
	// TODO: instead of simply checking ok, return a structured FetchError with a NotFound type, etc
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

/**
 * Action Builder: a helper function to create an Action
 */
function searching(searchTerms: string): Searching {
	return {
		type: ActionTypeKeys.SEARCHING,
		searchTerms: searchTerms
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
function receiveSearchResults(
	searchTerms: string,
	json: any
): SearchResultsReceived {
	// TODO: better error handling if we don't get back expected response,
	// rather than just accepting json.search
	return {
		type: ActionTypeKeys.SEARCH_RESULTS_RECEIVED,
		searchTerms: searchTerms,
		searchResults: json.search
	};
}

/**
 * Action Builder: a helper function to create an Action
 */
function errorSearch(searchTerms: string, error: Error): SearchErrored {
	return {
		type: ActionTypeKeys.SEARCH_ERRORED,
		searchTerms: searchTerms,
		error: new FetchErrorImpl(error.message)
	};
}
