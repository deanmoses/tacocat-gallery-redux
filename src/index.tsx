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

const { persistor, store } = configureStore();

// Check with the server to see if the user is authenticated
store.dispatch(updateAuthenticationStatusFromServer());

// Render the app into an element on the index HTML page
render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);
