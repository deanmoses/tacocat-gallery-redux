/**
 * The shape of the application's state.
 */
export interface State {
	/**
	 * True: user is authenticated
	 */
	readonly isAuthenticated: boolean;

	readonly someOtherProperty: string;
}
