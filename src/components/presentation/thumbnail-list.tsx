import * as React from 'react';
import { AlbumType, Thumbable } from '@src/models/models';
import { Thumbnail } from '@src/components/presentation/thumbnail';

/**
 * Component properties
 */
interface ComponentProps {
	readonly items: Thumbable[];
	readonly isAlbum?: boolean;
	readonly albumType?: AlbumType;
	readonly editMode?: boolean;
	readonly useLongDateAsTitle?: boolean;
	readonly useLongDateAsSummary?: boolean;
	readonly selectedItem?: any;
	readonly onSelect?: (x: any) => any;
}

/**
 * Component that displays a list of thumbnails.
 * The list could be of either albums or images.
 */
export class ThumbnailList extends React.Component<ComponentProps> {
	static defaultProps: Partial<ComponentProps> = {
		isAlbum: false,
		editMode: false,
		useLongDateAsTitle: false,
		useLongDateAsSummary: false
	};

	constructor(props: ComponentProps) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	render() {
		if (!this.props.items) {
			return false;
		}
		var isAlbum = this.props.isAlbum;
		var sectionText = isAlbum ? 'Albums' : 'Photos';
		var thumbs = this.props.items.map((child: any) => {
			if (this.props.editMode) {
				var selected =
					this.props.editMode &&
					!!this.props.selectedItem &&
					child.path.endsWith(this.props.selectedItem);
				return (
					<Thumbnail
						item={child}
						isAlbum={isAlbum}
						albumType={this.props.albumType}
						key={child.path}
						editMode={this.props.editMode}
						selected={selected}
						onSelect={this.onSelect.bind(this, child.path)}
					/>
				);
			} else {
				return (
					<Thumbnail
						item={child}
						isAlbum={isAlbum}
						albumType={this.props.albumType}
						key={child.path}
						useLongDateAsSummary={this.props.useLongDateAsSummary}
						useLongDateAsTitle={this.props.useLongDateAsTitle}
					/>
				);
			}
		});

		return (
			<section className="thumbnails">
				<h1 className="hidden">{sectionText}</h1>
				{thumbs}
			</section>
		);
	}

	onSelect(selectKey: any) {
		if (this.props.onSelect) {
			this.props.onSelect(selectKey);
		}
	}
}
