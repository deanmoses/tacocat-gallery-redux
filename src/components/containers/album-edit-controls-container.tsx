import * as React from 'react';
import { Album } from '@src/models/models';
import { AlbumEditMenu } from '@src/components/presentation/album-edit-menu';
import { AlbumActiveEditControls } from '@src/components/presentation/album-active-edit-controls';

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
	readonly album: Album;
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

	readonly onFieldChange?: (fieldName: string, newValue: any) => void;
}

/**
 * The album edit controls
 */
export class AlbumEditControls extends React.Component<ComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: ComponentProps) {
		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
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

	onFieldChange(field: string, newValue: any): void {
		// This will typically be hooked up by my Redux connector component, see my *-container.tsx file
		if (this.props.onFieldChange) {
			this.props.onFieldChange(field, newValue);
		}
	}

	render() {
		const album = this.props.album;
		switch (this.props.editMode) {
			case Mode.EDIT_MODE_DISALLOWED: {
				// User isn't allowed to edit.  Render nothing.
				return null;
			}
			case Mode.EDIT_MODE_ALLOWED: {
				// User is allowed to edit but isn't currently editing.  Show edit button and a dropdown of other options.
				return <AlbumEditMenu album={album} onEdit={this.onEdit} />;
			}
			case Mode.EDIT_MODE_ON: {
				// User is in edit mode.  Give controls to save and cancel.
				return (
					<AlbumActiveEditControls
						album={album}
						onCancel={this.onCancel}
						onSave={this.onSave}
						onFieldChange={this.onFieldChange}
					/>
				);
			}
			case Mode.SAVING: {
				// Save is in process
				return <div>Saving...</div>;
			}
			case Mode.SAVE_ERROR: {
				// There was an error saving
				return (
					<AlbumActiveEditControls
						album={album}
						onCancel={this.onCancel}
						isMessageError={true}
						message="Error saving."
					/>
				);
			}
			case Mode.SAVED: {
				// Draft was saved
				return (
					<AlbumActiveEditControls
						album={album}
						onCancel={this.onCancel}
						onSave={this.onSave}
						onFieldChange={this.onFieldChange}
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
