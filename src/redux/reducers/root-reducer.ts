import { RootState } from '@src/redux/reducers/root-state';
import { albumsByPathReducer } from '@src/redux/reducers/album-reducers';
import { latestAlbumReducer } from '@src/redux/reducers/latest-album-reducers';
import { isAuthenticatedReducer } from '@src/redux/reducers/authentication-reducers';

/**
 * Starting state of the application
 */
export const initialRootState: RootState = {
	albumsByPath: {},
	latestAlbum: null,
	isAuthenticated: false
};

/**
 * The root React Redux reducer.  It combines all the other reducers into a
 * single top-level reducer that the React Redux store calls.
 */
export const allReducers = {
	albumsByPath: albumsByPathReducer,
	latestAlbum: latestAlbumReducer,
	isAuthenticated: isAuthenticatedReducer
};
