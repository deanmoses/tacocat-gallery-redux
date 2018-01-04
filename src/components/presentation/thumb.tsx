//
// Thumbnail components
//

import * as React from 'react';
import * as StringUtils from '@src/utils/string-utils';
import * as DateUtils from '@src/utils/date-utils';
import Config from '@src/utils/config';
import { AlbumType, Thumbable } from '@src/redux/reducers/album';
import { Icon, Icons } from '@src/components/presentation/icon';

/**
 * List component properties
 */
interface ListProps {
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
export class List extends React.Component<ListProps> {
	static defaultProps: Partial<ListProps> = {
		isAlbum: false,
		editMode: false,
		useLongDateAsTitle: false,
		useLongDateAsSummary: false
	};

	constructor(props: ListProps) {
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
					StringUtils.endsWith(child.path, this.props.selectedItem);
				return (
					<Nail
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
					<Nail
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

/**
 * Nail component properties
 */
interface NailProps {
	readonly item: Thumbable;
	readonly isAlbum?: boolean;
	readonly albumType: AlbumType;
	readonly editMode?: boolean;
	readonly useLongDateAsTitle?: boolean;
	readonly useLongDateAsSummary?: boolean;
	readonly selectedItem?: any;
	readonly selected?: any;
	readonly onSelect?: () => any;
}
/**
 * Component that displays a thumbnail of either an album or an image.
 */
export class Nail extends React.Component<NailProps> {
	static defaultProps: Partial<NailProps> = {
		editMode: false,
		isAlbum: false,
		useLongDateAsTitle: false,
		useLongDateAsSummary: false
	};

	constructor(props: NailProps) {
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
		let title;
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
		} else {
			title = item.title;
		}
		let widthPx = width + 'px';
		let heightPx = height + 'px';
		var style = {
			width: widthPx
		};
		var imgLinkStyle = {
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

		var selectedClass =
			!this.props.editMode || !this.props.selected ? '' : ' selected';
		var selectButton = !this.props.editMode ? (
			''
		) : (
			<Icon icon={Icons.STAR} onClick={this.onSelect} />
		);
		var thumbUrl = Config.cdnHost() + item.urlThumb;

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
