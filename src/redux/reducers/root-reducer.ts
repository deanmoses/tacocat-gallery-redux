import { RootState } from '@src/redux/reducers/root-state';
import { albumsByPathReducer } from '@src/redux/reducers/album-reducer';
import { draftsByPathReducer } from '@src/redux/reducers/draft-reducer';
import { latestAlbumReducer } from '@src/redux/reducers/latest-album-reducer';
import { isAuthenticatedReducer } from '@src/redux/reducers/authentication-reducer';
import { editModeReducer } from '@src/redux/reducers/edit-mode-reducer';
import { searchesBySearchTermsReducer } from '@src/redux/reducers/search-reducer';

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
