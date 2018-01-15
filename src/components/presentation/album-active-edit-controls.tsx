import * as React from 'react';
import { Album, AlbumType } from '@src/models/models';
import { SaveIcon } from '@src/components/presentation/icon-save';
import { CancelIcon } from '@src/components/presentation/icon-cancel';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;

	readonly errorMessage?: string;

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
			this.props.onFieldChange('summary', event.currentTarget.value);
		}
	}

	onPublishedChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.onFieldChange) {
			this.props.onFieldChange('show', event.currentTarget.checked);
		}
	}

	render() {
		const a = this.props.album;
		const saveError = !!this.props.errorMessage;
		const message = this.props.errorMessage;
		const summaryControl =
			a.type !== AlbumType.DAY ? null : (
				<input
					type="text"
					key={a.path}
					defaultValue={a.customdata}
					placeholder="Summary"
					onChange={this.onSummaryChange}
				/>
			);
		const publishControl =
			a.type !== AlbumType.DAY ? null : (
				<span>
					<input
						type="checkbox"
						key={a.path}
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
						disabled={saveError}
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
