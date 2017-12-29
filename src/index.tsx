import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '@src/components/App';
import { configureStore } from '@src/store/configureStore';
import {
	updateUserAuthenticationStatus,
	createMyAction1
} from '@src/actions/actions';

// create the React Redux store, which stores the application's state
let store = configureStore();

console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(updateUserAuthenticationStatus(true));
store.dispatch(updateUserAuthenticationStatus(false));
store.dispatch(updateUserAuthenticationStatus(true));
store.dispatch(createMyAction1('foo'));
store.dispatch(createMyAction1('bar'));
store.dispatch(createMyAction1('baz'));

// Stop listening to state updates
unsubscribe();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
