import * as React from 'react';
import { Album, AlbumType } from '@src/models/models';
import { NextIcon } from '@src/components/presentation/icon-next';
import { PrevIcon } from '@src/components/presentation/icon-prev';

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
			this.props.onFieldChange('published', event.currentTarget.checked);
		}
	}

	render() {
		const a = this.props.album;
		const saveError = !!this.props.errorMessage;
		const message = this.props.errorMessage;
		const summaryControl =
			a.type === AlbumType.YEAR ? null : (
				<input
					type="text"
					defaultValue={a.summary}
					placeholder="Summary"
					onChange={this.onSummaryChange}
				/>
			);
		const publishControl =
			a.type === AlbumType.YEAR ? null : (
				<span>
					<input
						type="checkbox"
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
						<PrevIcon /> Cancel
					</button>
					<button
						type="button"
						className="btn btn-default"
						disabled={saveError}
						title="Save"
						onClick={this.onSave}
					>
						<NextIcon /> Save
					</button>
				</div>
				{summaryControl}
				{publishControl}
				{!!message && <span className="editStatusMsg">{message}</span>}
			</div>
		);
	}
}
