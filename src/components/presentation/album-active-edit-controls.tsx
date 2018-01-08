import * as React from 'react';
import { Album } from '@src/models/models';
import { Icon, Icons } from '@src/components/presentation/icon';

/**
 * Component properties
 */
interface ComponentProps {
	readonly album: Album;
}
/**
 * User is currently editing.  Show controls to save and cancel.
 */
export class AlbumActiveEditControls extends React.Component<ComponentProps> {
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
