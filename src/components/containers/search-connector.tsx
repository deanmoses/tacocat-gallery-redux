//
// This is the React Redux connector for the SearchContainer component.
//
// A Redux connector's job is to connect the target component to Redux in the following ways:
// 1) Connect the Redux store's state with the target component's properties -- see mapStateToProps() below.
// 2) Connect the target component's events (like fetchIfNeeded) to the Redux actions -- see mapDispatchToProps() below
//
// This way, the target component is completely unaware of Redux; it's a plain React component.
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchIfNeeded } from '@src/redux/actions/search-action-builders';
import {
	SearchContainer,
	ComponentProps
} from '@src/components/containers/search-container';
import { RootState } from '@src/redux/reducers/root-state';
import { getSearchResults } from '@src/redux/selectors/search-selectors';
import { SearchState } from '@src/models/models';

/**
 * My properties are different than the component I wrap!
 */
type ConnectedComponentProps = {
	readonly returnPath: string;
	readonly searchTerms?: string;
};

/**
 * mapStateToProps() is a standard Redux function to transform the state of
 * the Redux store into the target component's properties.
 *
 * This will be invoked any time the component is mounted and there are changes
 * to the state of the Redux store.
 *
 * @prop state the current Redux store state
 * @returns set of props for the target component
 */
function mapStateToProps(
	rootState: RootState,
	ownProps: ComponentProps
): Partial<ComponentProps> {
	if (!ownProps.searchTerms) {
		return {};
	}
	const search = getSearchResults(rootState, ownProps.searchTerms);
	if (!search) {
		return {
			state: SearchState.SEARCHING
		};
	} else {
		return {
			state: search.state,
			results: search.results,
			errorMessage: search.errorMessage
		};
	}
}

/**
 * mapDispatchToProps() is a a standard Redux function to map Redux
 * action creator functions to functions on the target component.
 */
function mapDispatchToProps(dispatch: any): Partial<ComponentProps> {
	return bindActionCreators(
		{
			fetchIfNeeded: searchIfNeeded
		},
		dispatch
	);
}

/**
 * Instead of the rest of the system using the target component, they will use
 * a Redux-wrapped component created with the connect() method below.
 *
 * The connect() wraps the target component in a Redux wrapper in order to:
 * 1) Be notified of changes to the state of the Redux store via mapStateToProps()
 * 2) When the target component invokes a function mapped in mapDispatchToProps(),
 *    the correct Redux action creator function is called.
 *
 * This way, the target component is completely unaware of Redux; it's a plain React component.
 */
const ConnectedComponent = connect<{}, {}, ConnectedComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(SearchContainer);
export default ConnectedComponent;
