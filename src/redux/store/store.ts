//
// Configures the React Redux store
//
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { allReducers } from '../reducers/root-reducer';
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
	storage: localForage,
	blacklist: ['isAuthenticated', 'editMode', 'draftsByPath']
};
const combinedReducers = persistCombineReducers(
	reduxPersistConfig,
	allReducers
);

/**
 * Export function that creates the Redux store
 */
export default function configureStore() {
	let store = createStore(
		combinedReducers,
		// TODO: replace <any> with the correct type.
		// The <any> makes store.dispatch() work with any type as well as Action.
		// This is a hack that allows me to pass Thunk functions to store.dispatch() 
		// without Typescript complaining.  I only need this in one place: index.tsx 
		// where I call store.dispatch(updateAuthenticationStatusFromServer())
		// Instead, I need to figure out the real type that Thunk can produce in 
		// this case.  I think it's something like this:
		// type DispatchFunctionType = ThunkDispatch<StateType, undefined, AnyAction>
		// See https://stackoverflow.com/questions/43013204/how-to-dispatch-an-action-or-a-thunkaction-in-typescript-with-redux-thunk
		composeWithDevTools(applyMiddleware<any>(thunk))
	);
	let persistor = persistStore(store);
	return { persistor, store };
}
