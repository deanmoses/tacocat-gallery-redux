import * as React from 'react';
import { Image } from '@src/models/models';
import Config from '@src/utils/config';
import { ViewIcon } from '@src/components/presentation/icon/icon-view';
import { EditIcon } from '@src/components/presentation/icon/icon-edit';

/**
 * Component properties
 */
interface ComponentProps {
	readonly image: Image;
	/**
	 * Called when my edit button is clicked
	 */
	readonly onEdit?: () => void;
}

/**
 * Edit button and a dropdown of other options.
 */
export class ImageEditMenu extends React.Component<ComponentProps> {
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
	onEdit() {
		// If my parent component gave me a function to call, call it
		if (this.props.onEdit) {
			this.props.onEdit();
		}
	}

	render() {
		const image = this.props.image;
		var zeditUrl = ''; //TODO: fix: Config.zenphotoImageEditUrl(album.path, image.filename);
		var zviewUrl = Config.zenphotoViewUrl(image.path);

		return (
			<div>
				<div className="btn-group">
					<button
						type="button"
						className="btn btn-default"
						onClick={this.onEdit}
					>
						<EditIcon /> Edit
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
								<EditIcon /> Edit in Zenphoto
							</a>
						</li>
						<li>
							<a href={zviewUrl} target="zenedit" title="View in Zenphoto">
								<ViewIcon /> View in Zenphoto
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
