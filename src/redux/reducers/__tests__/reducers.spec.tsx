import { combineReducers } from 'redux';
import { RootState } from '../root-state';
import { allReducers, initialRootState } from '../root-reducer';
import * as authenticationActions from '@src/redux/actions/authentication-actions';
import * as albumActions from '@src/redux/actions/album-actions';

const rootReducer = combineReducers<RootState>(allReducers);

describe('root reducer test', () => {
	it('should return the initial state', () => {
		expect(rootReducer(undefined, undefined)).toEqual({
			albumsByPath: {},
			isAuthenticated: false
		});
	});

	it('should keep authenticated=true', () => {
		const state: RootState = {
			albumsByPath: {},
			latestAlbum: null,
			isAuthenticated: true
		};
		expect(rootReducer(state, undefined)).toEqual({
			albumsByPath: {},
			isAuthenticated: true
		});
	});

	it('should update authenticated=true', () => {
		expect(
			rootReducer(
				initialRootState,
				authenticationActions.updateUserAuthenticationStatus(true)
			)
		).toEqual({
			albumsByPath: {},
			isAuthenticated: true
		});
	});

	it('should set album / to "not found"', () => {
		expect(
			rootReducer(
				initialRootState,
				albumActions.errorAlbum('/', { message: 'not found' })
			)
		).toEqual({
			albumsByPath: {
				'/': {
					err: {
						message: 'not found'
					},
					isLoading: false,
					path: '/'
				}
			},
			isAuthenticated: false
		});
	});
});
