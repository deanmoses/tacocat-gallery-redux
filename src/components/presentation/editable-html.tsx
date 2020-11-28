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
	readonly onHtmlChange?: (newValue: string) => void;
};

/**
 * Component that either displays text as HTML or shows a rich text editor if
 * the system is in edit mode.
 */
export const EditableHtml: React.FunctionComponent<ComponentProps> = ({
	html,
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
			onHtmlChange(newValue);
		}
	}

	return editMode ? (
		<Editor html={html} className={className} onHtmlChange={handleHtmlChange} />
	) : (
		<div className={className} dangerouslySetInnerHTML={{ __html: html }} />
	);
};
