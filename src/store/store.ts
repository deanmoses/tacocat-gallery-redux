//
// Configures the React Redux store
//

import * as redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import { allReducers } from '../reducers/reducers';

// Set up redux-persist
const config = {
	key: 'root',
	storage
};
const combinedReducers = persistCombineReducers(config, allReducers);

/**
 * Export function that creates the Redux store
 */
export default function configureStore() {
	let store = redux.createStore(
		combinedReducers,
		composeWithDevTools(redux.applyMiddleware(thunk))
	);
	let persistor = persistStore(store);
	return { persistor, store };
}
