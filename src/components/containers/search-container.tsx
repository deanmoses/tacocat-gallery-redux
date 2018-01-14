import * as React from 'react';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly returnPath: string;
	readonly doSearch?: Function;
};

/**
 * Search container component: manages search state, selects right search page to render
 */
export class SearchContainer extends React.Component<ComponentProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		//this.props.fetchIfNeeded(this.props.path);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	// componentWillReceiveProps(nextProps: ComponentProps) {
	// 	// Have we changed which album we're displaying?
	// 	let differentAlbum: boolean = nextProps.path !== this.props.path;
	// 	if (differentAlbum) {
	// 		this.props.fetchIfNeeded(nextProps.path);
	// 	}
	// }

	render() {
		return 'Search Page';
	}
}
