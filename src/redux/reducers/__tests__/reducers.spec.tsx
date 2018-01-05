import { combineReducers } from 'redux';
import * as reducers from '../reducers';
import { allReducers, RootState } from '../reducers';
import * as authenticationActions from '@src/redux/actions/authentication-actions';
import * as albumActions from '@src/redux/actions/album-actions';

const rootReducer = combineReducers<RootState>(allReducers);

describe('root reducer test', () => {
	const blankState: reducers.RootState = {
		albumsByPath: {},
		isAuthenticated: false
	};

	it('should return the initial state', () => {
		expect(rootReducer(undefined, undefined)).toEqual({
			albumsByPath: {},
			isAuthenticated: false
		});
	});

	it('should keep authenticated=true', () => {
		const state: reducers.RootState = {
			albumsByPath: {},
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
