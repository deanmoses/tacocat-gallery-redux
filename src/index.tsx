import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@src/components/App';
import { configureStore } from '@src/store/configureStore';
import {
	updateUserAuthenticationStatus,
	createMyAction1
} from '@src/actions/actions';

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

ReactDOM.render(<App />, document.getElementById('app'));
