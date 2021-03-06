import * as React from 'react';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly editMode: boolean;
};

/**
 * Adds <script> tag to page if in edit mode
 */
export class EditModeScriptsContainer extends React.Component<ComponentProps> {
	/**
	 * React.js component lifecycle method. Invoked once, immediately after the
	 * initial rendering occurs. At this point in the lifecycle, the component
	 * has a DOM representation which you can access via this.getDOMNode().
	 *
	 * This is the place to trigger async logic, such as Redux actions.
	 */
	componentDidMount() {
		if (this.props.editMode) {
			this.addScripts();
		}
	}

	/**
	 * React.js component lifecycle method.  Invoked immediately after updating occurs. 
	 * This method is not called for the initial render.
	 */
	componentDidUpdate(prevProps: ComponentProps) {
		// If we're going from edit off to edit on, add the scripts
		if (!prevProps.editMode && this.props.editMode) {
			this.addScripts();
		}
	}

	render(): any {
		return null;
	}

	/**
	 * Write some Javascript and CSS tags into the HTML
	 */
	addScripts() {
		// jQuery needed for Bootstrap, and that's it
		this.addScript(
			'https://code.jquery.com/jquery-3.2.1.slim.min.js',
			'sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g='
		);
		this.addScript(
			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
			'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa'
		);
		this.addCss('//cdn.quilljs.com/1.2.6/quill.bubble.css');
	}

	/**
	 * Add <script> tag to page
	 * @param src <script src>
	 * @param integrity <script integrity>
	 */
	addScript(src: string, integrity: string) {
		const script = document.createElement('script');

		script.src = src;
		script.integrity = integrity;
		script.async = false;
		script.crossOrigin = 'anonymous';

		document.head.appendChild(script);
	}

	/**
	 * Add <link> to stylesheet to page
	 * @param href URL to CSS file
	 */
	addCss(href: string) {
		const css = document.createElement('link');

		css.href = href;
		css.rel = 'stylesheet';

		document.head.insertBefore(css, document.head.firstChild);
	}
}
