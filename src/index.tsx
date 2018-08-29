/**
 * The initial javascript that's executed for the application
 */

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from '@src/redux/store/store';
import { updateAuthenticationStatusFromServer } from '@src/redux/actions/authentication-action-creators';
import { App } from '@src/components/app';
import EditModeScripts from '@src/components/containers/edit-mode-scripts-connector';
import { initialize } from 'react-ga';
import { handleKeyboardNavigation } from '@src/utils/keyboard-navigation';

// Set up Google Analytics
initialize('UA-634317-1');

// When there's a new version of the app in appcache, reload the app
window.applicationCache.addEventListener(
	'updateready',
	function () {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			// Browser downloaded a new app cache
			window.location.reload();
		} else {
			// Manifest hasn't changed. Nothing new to serve
		}
	},
	false
);

// Set up the Redux store
const { persistor, store } = configureStore();

// Check with the server to see if the user is authenticated
store.dispatch(updateAuthenticationStatusFromServer());

// Render the app into an element on the index HTML page
render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
			<EditModeScripts />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);

// Listen for keyboard navigation
document.addEventListener('keyup', (event) => {
	handleKeyboardNavigation(store, event)
});