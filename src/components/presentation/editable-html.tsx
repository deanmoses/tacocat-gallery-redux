import * as React from 'react';

/**
 * Component properties
 */
export type ComponentProps = {
	/**
	 * Text / HTML to either display read-only or via a rich text editor
	 */
	readonly html: string;
	/**
	 * CSS class names to add to the outputted HTML
	 */
	readonly className?: string;
};

/**
 * Component that either displays text as HTML or shows a rich text editor if
 * the system is in edit mode.
 *
 * TODO: build edit mode!
 */
export class EditableHtml extends React.Component<ComponentProps> {
	render() {
		return (
			<div
				className={this.props.className}
				dangerouslySetInnerHTML={{ __html: this.props.html }}
			/>
		);
	}
}
