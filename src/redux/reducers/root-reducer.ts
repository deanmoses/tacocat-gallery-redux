import { RootState } from '@src/redux/reducers/root-state';
import { albumsByPath } from '@src/redux/reducers/album-reducers';
import { isAuthenticated } from '@src/redux/reducers/authentication-reducers';

/**
 * Starting state of the application
 */
export const initialRootState: RootState = {
	albumsByPath: {},
	latestAlbum: {},
	isAuthenticated: false
};

/**
 * The root React Redux reducer.  It combines all the other reducers into a
 * single top-level reducer that the React Redux store calls.
 */
export const allReducers = {
	albumsByPath: albumsByPath,
	isAuthenticated: isAuthenticated
};
