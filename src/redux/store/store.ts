//
// Configures the React Redux store
//

import * as redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { allReducers } from '../reducers/reducers';
import * as localForage from 'localforage';

//
// Configure redux-persist
//
localForage.config({
	name: 'tacocatGalleryApp',
	description: 'Storage for Tacocat.com photo gallery'
});
const reduxPersistConfig = {
	key: 'root',
	storage: localForage
};
const combinedReducers = persistCombineReducers(
	reduxPersistConfig,
	allReducers
);

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
