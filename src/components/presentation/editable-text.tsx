import * as React from 'react';

/**
 * Component properties
 */
export interface ComponentProps {
	/**
	 * Plain text to either display read-only or editable.
	 */
	readonly text: string;

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
	 * Called when my text content changes.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file.
	 */
	readonly onTextChange?: (newValue: string) => void;
}

/**
 * Component that displays plain text either read-only or editable if
 * the system is in edit mode.
 */
export const EditableText: React.FunctionComponent<ComponentProps> = ({
	text,
	className,
	editMode = false,
	onTextChange
}) => {
	/**
	 * Invoked when my text content changes.
	 * Invoke the onTextChange passed in by my parent.
	 */
	function handleTextChange(event: React.FormEvent<HTMLSelectElement>) {
		if (onTextChange) {
			onTextChange(event.currentTarget.innerText);
		}
	}

	return editMode ? (
		<span className={className} onInput={handleTextChange} contentEditable>
			{text}
		</span>
	) : (
		<span className={className}>{text}</span>
	);
};
