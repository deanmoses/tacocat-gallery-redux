import * as React from 'react';
import { Album } from '@src/models/models';
import Config from '@src/utils/config';
import { Icon, Icons } from '@src/components/presentation/icon';

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
}

/**
 * The album edit controls
 */
export class AlbumEditControls extends React.Component<ComponentProps> {
	render() {
		const album = this.props.album;
		switch (this.props.editMode) {
			case Mode.EDIT_MODE_DISALLOWED: {
				// User isn't allowed to edit.  Render nothing.
				return null;
			}
			case Mode.EDIT_MODE_ALLOWED: {
				// User is allowed to edit but isn't currently editing.  Show edit button and a dropdown of other options.
				return <EditMenu album={album} />;
			}
			case Mode.EDIT_MODE_ON: {
				// User is in edit mode.  Give controls to save and cancel.
				return <ActiveEditControls album={album} />;
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

/**
 * Component properties
 */
interface EditMenuComponentProps {
	readonly album: Album;
}

/**
 * User is allowed to edit but isn't currently editing.  Show edit button and a dropdown of other options.
 */
export class EditMenu extends React.Component<EditMenuComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: EditMenuComponentProps) {
		super(props);
		this.edit.bind(this);
	}

	edit() {
		console.log('Hey! Set edit mode!');
	}

	render() {
		const a = this.props.album;
		var zeditUrl = Config.zenphotoAlbumEditUrl(a.path);
		var zviewUrl = Config.zenphotoViewUrl(a.path);

		return (
			<div className="editControls">
				<div className="btn-group">
					<button type="button" className="btn btn-default" onClick={this.edit}>
						<Icon icon={Icons.CHEVRON_RIGHT} /> Edit
					</button>
					<button
						type="button"
						className="btn btn-default dropdown-toggle"
						data-toggle="dropdown"
						aria-expanded="false"
					>
						<span className="caret" />
						<span className="sr-only">Toggle Dropdown</span>
					</button>
					<ul className="dropdown-menu" role="menu">
						<li>
							<a href={zeditUrl} target="zenedit" title="Edit in Zenphoto">
								<Icon icon={Icons.CHEVRON_RIGHT} /> Edit in Zenphoto
							</a>
						</li>
						<li>
							<a href={zviewUrl} target="zenedit" title="View in Zenphoto">
								<Icon icon={Icons.CHEVRON_RIGHT} /> View in Zenphoto
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

/**
 * User is currently editing.  Show controls to save and cancel.
 */
export class ActiveEditControls extends React.Component<
	EditMenuComponentProps
> {
	render() {
		return (
			<div className="editControls">
				<div className="btn-group">
					<button
						type="button"
						className="btn btn-default"
						title="Leave edit mode"
					>
						<Icon icon={Icons.CHEVRON_RIGHT} /> Cancel
					</button>
					<button
						type="button"
						className="btn btn-default"
						title="Save album description"
					>
						<Icon icon={Icons.CHEVRON_RIGHT} /> Save
					</button>
				</div>
				TODO: IMPLEMENT
			</div>
		);
	}
}
