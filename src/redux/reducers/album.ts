import * as DateUtils from '@src/utils/date-utils';

/**
 * Interfaces for the application state
 */

export interface AlbumsByPath {
	[albumPath: string]: Album;
}

export interface Album {
	path: string;
	title?: string;
	summary?: string;
	description?: string;
	image_size?: number;
	thumb_size?: number;
	thumb?: string;
	date?: number;
	images?: (Image)[] | null;
	parent_album?: AlbumNavInfo;
	next?: AlbumNavInfo;
	isLoading?: boolean;
	err?: string;
	type?: AlbumType;
	pageTitle?: string;
	href?: string;
	nextAlbumHref?: string;
	nextAlbumTitle?: string;
	prevAlbumHref?: string;
	prevAlbumTitle?: string;
	parentAlbumHref?: string;
	parentAlbumTitle?: string;
}

export interface Image {
	path: string;
	title: string;
	date: number;
	description: string;
	urlFull: string;
	urlSized: string;
	urlThumb: string;
	width: number;
	height: number;
}

export interface AlbumNavInfo {
	path: string;
	title: string;
	date: number;
}

export enum AlbumType {
	ROOT = 'ROOT',
	YEAR = 'YEAR',
	DAY = 'DAY'
}

export class Alb implements Album {
	path: string;
	title?: string;
	summary?: string;
	unpublished?: boolean;
	description?: string;
	image_size?: number;
	thumb_size?: number;
	thumb?: string;
	date?: number;
	images?: (Image)[] | null;
	parent_album?: AlbumNavInfo;
	next?: AlbumNavInfo;
	prev?: AlbumNavInfo;
	isLoading?: boolean;
	err?: string;

	constructor(path: string) {
		this.path = path;
	}

	static fromObject(json: any): Alb {
		let alb = Object.create(Alb.prototype);
		return Object.assign(alb, json);
	}

	get type(): AlbumType {
		// no path: it's the root album
		if (!this.path || this.path.length <= 0) {
			return AlbumType.ROOT;
		} else if (this.path.indexOf('/') < 0) {
			// no slashes:  it's a year album
			return AlbumType.YEAR;
		} else {
			// else it's a subalbum (2005/12-31 or 2005/12-31/snuggery)
			return AlbumType.DAY;
		}
	}

	/**
	 * Friendly title of page
	 */
	get pageTitle(): string {
		switch (this.type) {
			case AlbumType.ROOT:
				return '';
			case AlbumType.YEAR:
				return DateUtils.year(this.date);
			case AlbumType.DAY:
				return DateUtils.longDate(this.date);
			default:
				throw 'no such type';
		}
	}

	/**
	 * True: album is public
	 */
	get published(): boolean {
		return !this.unpublished;
	}

	/**
	 * URL (including hashtag) to screen displaying album, like #2014/12-31
	 */
	get href(): string {
		return '#' + this.path;
	}

	/**
	 * Path of next album
	 * Blank if no next album
	 */
	get nextAlbumPath(): string {
		return this.next ? this.next.path : '';
	}

	/**
	 * URL to next album, including hash
	 * Blank if no next album
	 */
	get nextAlbumHref(): string {
		return this.next ? '#' + this.next.path : '';
	}

	/**
	 * Path of previous album
	 * Blank if no previous album
	 */
	get prevAlbumPath(): string {
		return this.prev ? this.prev.path : '';
	}

	/**
	 * URL to previous album, including hash
	 * Blank if no previous album
	 */
	get prevAlbumHref(): string {
		return this.prev ? '#' + this.prev.path : '';
	}

	/**
	 * URL to parent album, including hash
	 * Blank if no parent album
	 */
	get parentAlbumHref(): string {
		return this.parent_album ? '#' + this.parent_album.path : '';
	}

	/**
	 * Title of next album
	 * Blank if no next album
	 */
	get nextAlbumTitle(): string {
		if (!this.next) {
			return '';
		} else if (this.type === AlbumType.YEAR) {
			return DateUtils.year(this.next.date);
		} else {
			return DateUtils.shortDate(this.next.date);
		}
	}

	/**
	 * Title of previous album
	 * Blank if no previous album
	 */
	get prevAlbumTitle(): string {
		if (!this.prev) {
			return '';
		} else if (this.type === AlbumType.YEAR) {
			return DateUtils.year(this.prev.date);
		} else {
			return DateUtils.shortDate(this.prev.date);
		}
	}

	/**
	 * Title of parent album
	 * Blank if no parent album
	 */
	get parentAlbumTitle(): string {
		return this.parent_album ? this.parent_album.title : '';
	}
}
