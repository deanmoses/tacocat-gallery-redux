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
	 * CSS class names to add to the outputted HTML
	 */
	readonly className?: string;
	readonly editMode?: boolean;
};

/**
 * Component that either displays text as HTML or shows a rich text editor if
 * the system is in edit mode.
 *
 * TODO: build edit mode!
 */
export const EditableHtml: React.StatelessComponent<ComponentProps> = ({
	html,
	className,
	editMode = false
}) => {
	return editMode ? (
		<Editor html={html} className={className} />
	) : (
		<div className={className} dangerouslySetInnerHTML={{ __html: html }} />
	);
};
