import { combineReducers } from 'redux';
import { RootState } from '../root-state';
import { allReducers } from '../root-reducer';
import * as authenticationActions from '@src/redux/actions/authentication-actions';
import * as albumActions from '@src/redux/actions/album-actions';

const rootReducer = combineReducers<RootState>(allReducers);

describe('root reducer test', () => {
	const blankState: RootState = {
		albumsByPath: {},
		latestAlbum: {},
		isAuthenticated: false
	};

	it('should return the initial state', () => {
		expect(rootReducer(undefined, undefined)).toEqual({
			albumsByPath: {},
			isAuthenticated: false
		});
	});

	it('should keep authenticated=true', () => {
		const state: RootState = {
			albumsByPath: {},
			latestAlbum: {},
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
				blankState,
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
				blankState,
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
