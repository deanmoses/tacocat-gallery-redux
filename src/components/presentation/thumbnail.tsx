import * as React from 'react';
import * as DateUtils from '@src/utils/date-utils';
import Config from '@src/utils/config';
import { AlbumType, Thumbable } from '@src/models/models';
import { StarIcon } from '@src/components/presentation/icon/icon-star';
import { EmptyStarIcon } from '@src/components/presentation/icon/icon-star-empty';

/**
 * Component properties
 */
export type ComponentProps = {
	readonly item: Thumbable;
	readonly isAlbum?: boolean;
	readonly albumType: AlbumType;
	readonly editMode?: boolean;
	readonly useLongDateAsTitle?: boolean;
	readonly useLongDateAsSummary?: boolean;
	readonly selected?: boolean;
	readonly onSelect?: () => void;
};

/**
 * Component that displays a thumbnail of either an album or an image.
 */
export class Thumbnail extends React.Component<ComponentProps> {
	static defaultProps: Partial<ComponentProps> = {
		editMode: false,
		isAlbum: false,
		useLongDateAsTitle: false,
		useLongDateAsSummary: false
	};

	constructor(props: ComponentProps) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	render() {
		let item = this.props.item;
		if (!item) {
			return false;
		}
		let width = 200;
		let height = 200;
		let title = item.title;
		if (this.props.isAlbum) {
			if (this.props.albumType === AlbumType.ROOT) {
				title = DateUtils.year(item.date);
			} else {
				// else if (this.props.albumType === 'latest') {
				// 	title = DateUtils.longDate(item.date);
				// }
				title = DateUtils.shortDate(item.date);
			}
		} else if (this.props.useLongDateAsTitle) {
			title = DateUtils.longDate(item.date);
		}
		let widthPx = width + 'px';
		let heightPx = height + 'px';
		let style = {
			width: widthPx
		};
		let imgLinkStyle = {
			width: widthPx,
			height: heightPx
		};
		let summary: string = ''; //item.summary;
		if (!summary && this.props.useLongDateAsSummary) {
			summary = DateUtils.longDate(item.date);
		}
		let summaryElement = !summary ? (
			''
		) : (
			<p className="thumb-summary" style={style}>
				{summary}
			</p>
		);

		let selectedClass = '';
		let selectButton;

		if (this.props.editMode) {
			if (this.props.selected) {
				selectedClass = ' selected';
				selectButton = <StarIcon onClick={this.onSelect} />;
			} else {
				selectButton = <EmptyStarIcon onClick={this.onSelect} />;
			}
		}

		let thumbUrl = Config.cdnUrl(item.url_thumb, item.last_modified_date);

		return (
			<span className={'thumbnail' + selectedClass}>
				<a href={'#' + item.path} className="thumb-link" style={imgLinkStyle}>
					<img src={thumbUrl} width={width} height={height} alt={title} />
				</a>
				{selectButton}
				<a href={'#' + item.path}>
					<span className="thumb-caption" style={style}>
						{title}
					</span>
				</a>
				{summaryElement}
			</span>
		);
	}

	onSelect() {
		if (this.props.onSelect) {
			this.props.onSelect();
		}
	}
}
