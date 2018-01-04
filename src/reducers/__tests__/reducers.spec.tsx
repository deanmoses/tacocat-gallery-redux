import { combineReducers } from 'redux';
import * as reducers from '../reducers';
import { allReducers, RootState } from '../reducers';
import * as actions from '@src/actions/actions';

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
			rootReducer(blankState, actions.updateUserAuthenticationStatus(true))
		).toEqual({
			albumsByPath: {},
			isAuthenticated: true
		});
	});

	it('should set album / to "not found"', () => {
		expect(
			rootReducer(blankState, actions.errorAlbum('/', { message: 'not found' }))
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
