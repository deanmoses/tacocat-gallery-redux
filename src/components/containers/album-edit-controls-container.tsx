import * as React from 'react';
import { Album } from '@src/models/models';
import { AlbumEditMenu } from '@src/components/presentation/album-edit-menu';
import { AlbumActiveEditControls } from '@src/components/presentation/album-active-edit-controls';

export enum Mode {
	/** User isn't allowed to start edit mode -- hide the controls completely */
	EDIT_MODE_DISALLOWED,
	/** User is authenticated and allowed to start edit mode -- show edit button */
	EDIT_MODE_ALLOWED,
	/** User is in edit mode -- show full controls */
	EDIT_MODE_ON,
	/** User has clicked save and we're currently saving -- show saving message */
	SAVING
}

/**
 * Component properties
 */
export interface ComponentProps {
	readonly album: Album;
	readonly editMode?: Mode;
	/**
	 * Called when my edit button is clicked
	 */
	readonly onEdit?: (editMode: boolean) => void;
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
	}

	/**
	 * User clicked the edit button
	 */
	onEdit(): void {
		console.log('Hey! Set edit mode in PARENT!');
		// This will typically be hooked up by my Redux connector component, see my *-container.tsx file
		if (this.props.onEdit) {
			this.props.onEdit(true);
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
				return <AlbumActiveEditControls album={album} />;
			}
			case Mode.SAVING: {
				return <div>Saving...</div>;
			}
			default: {
				// Shouldn't get here
				return null;
			}
		}
	}
}
