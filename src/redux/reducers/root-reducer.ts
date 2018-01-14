import { RootState } from '@src/redux/reducers/root-state';
import { albumsByPathReducer } from '@src/redux/reducers/album-reducers';
import { draftsByPathReducer } from '@src/redux/reducers/draft-reducers';
import { latestAlbumReducer } from '@src/redux/reducers/latest-album-reducers';
import { isAuthenticatedReducer } from '@src/redux/reducers/authentication-reducers';
import { editModeReducer } from '@src/redux/reducers/edit-mode-reducers';
import { searchesBySearchTermsReducer } from '@src/redux/reducers/search-reducers';

/**
 * Starting state of the application
 */
export const initialRootState: RootState = {
	albumsByPath: {},
	draftsByPath: {},
	searchesBySearchTerms: {},
	latestAlbum: null,
	isAuthenticated: false,
	editMode: false
};

/**
 * The root React Redux reducer.  It combines all the other reducers into a
 * single top-level reducer that the React Redux store calls.
 */
export const allReducers = {
	albumsByPath: albumsByPathReducer,
	draftsByPath: draftsByPathReducer,
	searchesBySearchTerms: searchesBySearchTermsReducer,
	latestAlbum: latestAlbumReducer,
	isAuthenticated: isAuthenticatedReducer,
	editMode: editModeReducer
};
