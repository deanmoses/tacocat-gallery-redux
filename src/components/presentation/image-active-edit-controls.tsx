import * as React from 'react';
import { Icon, Icons } from '@src/components/presentation/icon';

/**
 * Component properties
 */
interface ComponentProps {
	readonly errorMessage?: string;

	/**
	 * Called when my cancel button is clicked
	 */
	readonly onCancel?: () => void;

	/**
	 * Called when my save button is clicked
	 */
	readonly onSave?: () => void;
}

/**
 * Controls during edit mode for an image
 */
export class ImageActiveEditControls extends React.Component<ComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: ComponentProps) {
		super(props);
		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
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

	render() {
		const saveError = !!this.props.errorMessage;
		return (
			<div>
				<div className="btn-group">
					<button
						type="button"
						className="btn btn-default"
						title="Leave edit mode"
						onClick={this.onCancel}
					>
						<Icon icon={Icons.CHEVRON_RIGHT} /> Cancel
					</button>
					<button
						type="button"
						className="btn btn-default"
						disabled={saveError}
						title="Save"
						onClick={this.onSave}
					>
						<Icon icon={Icons.CHEVRON_RIGHT} /> Save
					</button>
				</div>
				{this.props.errorMessage}
			</div>
		);
	}
}