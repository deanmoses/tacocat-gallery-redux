import * as React from 'react';
import { Image } from '@src/models/models';
import { ImageEditMenu } from '@src/components/presentation/image-edit-menu';
import { ImageActiveEditControls } from '@src/components/presentation/image-active-edit-controls';

/**
 * What 'mode' this component is in
 */
export enum Mode {
	/** User isn't allowed to start edit mode -- hide the controls completely */
	EDIT_MODE_DISALLOWED,
	/** User is authenticated and allowed to start edit mode -- show edit button */
	EDIT_MODE_ALLOWED,
	/** User is in edit mode -- show full controls */
	EDIT_MODE_ON,
	/** User has clicked save and we're currently saving -- show saving message */
	SAVING,
	/** There was an error saving -- show error message */
	SAVE_ERROR,
	/** The draft was successfully saved -- show saved message */
	SAVED
}

/**
 * Component properties
 */
export interface ComponentProps {
	readonly image: Image;
	readonly editMode?: Mode;
	/**
	 * Called when my Edit button is clicked.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file.
	 */
	readonly onEdit?: () => void;
	/**
	 * Called when my Cancel Edit button is clicked.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file
	 */
	readonly onCancel?: () => void;

	/**
	 * Called when my Save button is clicked.
	 * This will typically be hooked up by my Redux connector component, see my *-container.tsx file
	 */
	readonly onSave?: () => void;
}

/**
 * The image edit controls
 */
export class ImageEditControls extends React.Component<ComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: ComponentProps) {
		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	/**
	 * User clicked the Edit button
	 */
	onEdit(): void {
		// This will typically be hooked up by my Redux connector component, see my *-container.tsx file
		if (this.props.onEdit) {
			this.props.onEdit();
		}
	}

	/**
	 * User clicked the Cancel button
	 */
	onCancel(): void {
		// This will typically be hooked up by my Redux connector component, see my *-container.tsx file
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}

	/**
	 * User clicked the Save button
	 */
	onSave(): void {
		// This will typically be hooked up by my Redux connector component, see my *-container.tsx file
		if (this.props.onSave) {
			this.props.onSave();
		}
	}

	render() {
		const image = this.props.image;
		switch (this.props.editMode) {
			case Mode.EDIT_MODE_DISALLOWED: {
				// User isn't allowed to edit.  Render nothing.
				return null;
			}
			case Mode.EDIT_MODE_ALLOWED: {
				// User is allowed to edit but isn't currently editing.  Show edit button and a dropdown of other options.
				return <ImageEditMenu image={image} onEdit={this.onEdit} />;
			}
			case Mode.EDIT_MODE_ON: {
				// User is in edit mode.  Give controls to save and cancel.
				return (
					<ImageActiveEditControls
						onCancel={this.onCancel}
						onSave={this.onSave}
					/>
				);
			}
			case Mode.SAVING: {
				return <div>Saving...</div>;
			}
			case Mode.SAVE_ERROR: {
				return (
					<ImageActiveEditControls
						onCancel={this.onCancel}
						isMessageError={true}
						message="Error saving."
					/>
				);
			}
			case Mode.SAVED: {
				return (
					<ImageActiveEditControls
						onCancel={this.onCancel}
						onSave={this.onSave}
						message="Saved."
					/>
				);
			}
			default: {
				// If my parent hasn't passed in an edit mode, render nothing
				return null;
			}
		}
	}
}
