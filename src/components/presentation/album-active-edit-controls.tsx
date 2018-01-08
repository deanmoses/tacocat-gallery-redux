import * as React from 'react';
import { Album } from '@src/models/models';
import { Icon, Icons } from '@src/components/presentation/icon';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
	/**
	 * Called when my cancel button is clicked
	 */
	readonly onCancel?: () => void;
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
	}

	/**
	 * User clicked the cancel button
	 */
	onCancel() {
		// If my parent component gave me an onCancel function to call
		// via my onCancel property, call it.
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}

	render() {
		return (
			<div className="editControls">
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
