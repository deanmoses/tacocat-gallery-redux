import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@src/redux/actions/actions';
import { RootState } from '@src/redux/reducers/reducers';
import { Image } from '@src/models/album';
import ImagePage from '@src/components/pages/image-page';

/**
 * The shape of this component's properties
 */
type ComponentProps = {
	readonly path: string;
	readonly image?: Image;
	readonly fetchIfNeeded?: Function;
};
/**
 * The component itself.
 */
class ImageContainer extends React.Component<ComponentProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		this.props.fetchIfNeeded(this.props.path);
	}

	/**
	 * React.js component lifecycle method.  Invoked before a mounted component
	 * receives new props.  Note that React may call this method even if the props
	 * have not changed, so make sure to compare the current and next values if you
	 * only want to handle changes. This may occur when the parent component causes
	 * your component to re-render.
	 */
	componentWillReceiveProps(nextProps: ComponentProps) {
		// Have we changed which image we're displaying?
		let differentImage: boolean = nextProps.path !== this.props.path;
		if (differentImage) {
			this.props.fetchIfNeeded(nextProps.path);
		}
	}

	render() {
		console.log(
			`ImageContainer.render(${this.props.path}) image: ${this.props.image}`
		);

		const image = this.props.image as Image;

		if (image) document.title = image.path;
		return <ImagePage path={this.props.path} />;
	}
}

//
// Redux redux machinery below this point
//
// The above component is a "pure" component that just knows about its properties
// and what functions it publishes to the outside world.  It doesn't know anything about:
//  - Redux
//  - calling Ajax
//

/**
 * To use React Redux connect(), define a mapStateToProps() function that
 * transforms the state of the Redux store into this component's props.
 *
 * @prop state the current Redux store state
 * @returns set of props for this component
 */
function mapStateToProps(state: RootState, ownProps: ComponentProps) {
	const path: string = ownProps.path;
	// TODO: figure out image state
	const image: Image = !state ? null : null;
	//const image: Image = state.imagesByPath[path];

	return {
		path,
		image
	};
}
/**
 * To use React Redux connect(), define a mapDispatchToProps() function that
 * maps a function on this component to a Redux action creator function.
 */
function mapDispatchToProps(dispatch: any) {
	return bindActionCreators(
		{
			fetchIfNeeded: actions.fetchImageIfNeeded
		},
		dispatch
	);
}

/**
 * Instead of exporting the ImageContainer component, export a Redux-wrapped component.
 *
 * We need to wrap the AlbumContainer component in a Redux wrapper in order to be
 * notified of changes to global state and map the new global state to this
 * component's properties.
 *
 * The Redux connect() method does the wrapping.
 */
export const ConnectedComponent = connect<{}, {}, ComponentProps>(
	mapStateToProps,
	mapDispatchToProps
)(ImageContainer);
export default ConnectedComponent;
