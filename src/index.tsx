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

// Create the React Redux store.  This stores the application's state
let store = redux.createStore<RootState>(
	rootReducer,
	initialRootState,
	redux.applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
