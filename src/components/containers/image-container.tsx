import * as React from 'react';
import { Image } from '@src/models/album';
import ImagePage from '@src/components/pages/image-page';

/**
 * The shape of this component's properties
 */
type ComponentProps = {
	readonly path: string;
	readonly image?: Image;
	readonly fetchImageIfNeeded?: Function;
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
		//this.props.fetchImageIfNeeded(this.props.path);
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
			//this.props.fetchImageIfNeeded(nextProps.path);
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
export default ImageContainer;
