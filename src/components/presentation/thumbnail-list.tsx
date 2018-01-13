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
	readonly useLongDateAsTitle?: boolean;
	readonly useLongDateAsSummary?: boolean;
	/** URL of selected thumbnail. Only used in edit mode. */
	readonly selectedItemUrl?: any;
	readonly onSelect?: (x: any) => any;
}

/**
 * Component that displays a list of thumbnails.
 * The list could be of either albums or images.
 */
export class ThumbnailList extends React.Component<ComponentProps> {
	static defaultProps: Partial<ComponentProps> = {
		isAlbum: false,
		useLongDateAsTitle: false,
		useLongDateAsSummary: false
	};

	constructor(props: ComponentProps) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	render() {
		if (!this.props.items) {
			return null;
		}
		var isAlbum = this.props.isAlbum;
		var sectionText = isAlbum ? 'Albums' : 'Photos';

		// build thumbnails
		var thumbs = this.props.items.map((child: any) => {
			var selected = child.url_thumb.endsWith(this.props.selectedItemUrl);
			return (
				<Thumbnail
					item={child}
					isAlbum={isAlbum}
					albumType={this.props.albumType}
					key={child.path}
					useLongDateAsSummary={this.props.useLongDateAsSummary}
					useLongDateAsTitle={this.props.useLongDateAsTitle}
					selected={selected}
					onSelect={this.onSelect.bind(this, child.path)}
				/>
			);
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
