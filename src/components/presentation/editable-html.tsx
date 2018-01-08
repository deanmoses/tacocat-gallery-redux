import * as React from 'react';
import { Editor } from '@src/components/presentation/editor';

/**
 * Component properties
 */
export type ComponentProps = {
	/**
	 * Text / HTML to either display read-only or via a rich text editor
	 */
	readonly html: string;

	/**
	 * Name of the field being edited.
	 * For example, if this is editing or displaying album.desc, this would be 'desc'.
	 */
	readonly field: string;

	/**
	 * Path of the album or image whose field is being edited
	 */
	readonly path: string;

	/**
	 * Optional CSS class names to add to me
	 */
	readonly className?: string;

	/**
	 * Whether or not to show the editor.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file.
	 */
	readonly editMode?: boolean;

	/**
	 * Called when my text / HTML content changes.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file.
	 */
	readonly onHtmlChange?: (
		path: string,
		field: string,
		newValue: string
	) => void;
};

/**
 * Component that either displays text as HTML or shows a rich text editor if
 * the system is in edit mode.
 */
export const EditableHtml: React.StatelessComponent<ComponentProps> = ({
	html,
	field,
	path,
	className,
	editMode = false,
	onHtmlChange
}) => {
	/**
	 * Invoked when my rich text editor content changes.
	 * Invoke the onHtmlChange passed in by my parent, adding
	 * the field and path passed in by my parent.
	 */
	function handleHtmlChange(newValue: string): void {
		if (onHtmlChange) {
			onHtmlChange(path, field, newValue);
		}
	}

	return editMode ? (
		<Editor
			html={html}
			className={className}
			onHtmlChange={handleHtmlChange}
			key={path + html}
		/>
	) : (
		<div className={className} dangerouslySetInnerHTML={{ __html: html }} />
	);
};
