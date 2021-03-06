import * as React from 'react';
import { Album, AlbumType } from '@src/models/models';
import { SaveIcon } from '@src/components/presentation/icon/icon-save';
import { CancelIcon } from '@src/components/presentation/icon/icon-cancel';
import { getAlbumType } from '@src/utils/path-utils';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;

	/**
	 * Message to display within the controls, like "Saved." or "Error Saving."
	 */
	readonly message?: string;

	/**
	 * True: the message property is an error message.  Disable various buttons.
	 */
	readonly isMessageError?: boolean;

	/**
	 * Called when my cancel button is clicked
	 */
	readonly onCancel?: () => void;

	/**
	 * Called when my save button is clicked
	 */
	readonly onSave?: () => void;

	/**
	 * Called when any field changes
	 */
	readonly onFieldChange?: (field: string, newValue: any) => void;
}

/**
 * User is currently editing.  Show controls to save and cancel.
 */
export class AlbumActiveEditControls extends React.Component<ComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: ComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onSummaryChange = this.onSummaryChange.bind(this);
		this.onPublishedChange = this.onPublishedChange.bind(this);
	}

	/**
	 * User clicked the cancel button
	 */
	onCancel() {
		// If my parent component gave me a function to call, call it
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}

	/**
	 * User clicked the save button
	 */
	onSave() {
		// If my parent component gave me a function to call, call it
		if (this.props.onSave) {
			this.props.onSave();
		}
	}

	onSummaryChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.onFieldChange) {
			this.props.onFieldChange('customdata', event.target.value);
		}
	}

	onPublishedChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.onFieldChange) {
			this.props.onFieldChange('unpublished', !event.target.checked);
		}
	}

	render() {
		const a = this.props.album;
		const message = this.props.message;
		const isDayAlbum = getAlbumType(a.path) === AlbumType.DAY;
		const summaryControl = !isDayAlbum ? null : (
			<input
				type="text"
				key={a.path + a.customdata}
				defaultValue={a.customdata}
				placeholder="Summary"
				onChange={this.onSummaryChange}
			/>
		);
		const publishControl = !isDayAlbum ? null : (
			<span>
				<input
					type="checkbox"
					key={a.path + a.unpublished}
					defaultChecked={!a.unpublished}
					onChange={this.onPublishedChange}
				/>{' '}
				published
			</span>
		);

		return (
			<div className="editControls">
				<div className="btn-group">
					<button
						type="button"
						className="btn btn-default"
						title="Leave edit mode"
						onClick={this.onCancel}
					>
						<CancelIcon /> Cancel
					</button>
					<button
						type="button"
						className="btn btn-default"
						disabled={!!this.props.isMessageError}
						title="Save"
						onClick={this.onSave}
					>
						<SaveIcon /> Save
					</button>
				</div>
				{summaryControl}
				{publishControl}
				{!!message && <span className="editStatusMsg">{message}</span>}
			</div>
		);
	}
}
