/**
 * This is the initial javascript of the application; I'm responsible for
 * finding some DOM element in the HTML page and attaching the app to it.
 */

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';
import {
	rootReducer,
	initialRootState,
	RootState
} from '@src/reducers/reducers';
import { App } from '@src/components/App';

// helper to enable the redux Chrome devtools extension
const compose =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

// Create the React Redux store.  This stores the application's state
let store = redux.createStore<RootState>(
	rootReducer,
	initialRootState,
	compose(redux.applyMiddleware(thunk))
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
