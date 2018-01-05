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
	desc?: string;
	image_size?: number;
	thumb_size?: number;
	thumb?: string;
	date?: number;
	images?: Image[];
	albums?: AlbumThumb[];
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

export interface Thumbable {
	path: string;
	title: string;
	date: number;
	desc: string;
	url_full: string;
	url_sized: string;
	url_thumb: string;
	width: number;
	height: number;
}

export interface AlbumThumb extends Thumbable {
	type?: AlbumType;
}

export interface Image extends Thumbable {}

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
	desc?: string;
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
		if (!(typeof path === 'string'))
			throw new Error('Album path must be a string');
		this.path = path;
	}

	get type(): AlbumType {
		return Alb.type(this.path);
	}

	static type(path: string): AlbumType {
		if (!path || path.length <= 0 || path === '/') {
			return AlbumType.ROOT;
		} else if (path.indexOf('/') < 0) {
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
		return this.title;
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
		return this.next ? this.next.title : '';
	}

	/**
	 * Title of previous album
	 * Blank if no previous album
	 */
	get prevAlbumTitle(): string {
		return this.prev ? this.prev.title : '';
	}

	/**
	 * Title of parent album
	 * Blank if no parent album
	 */
	get parentAlbumTitle(): string {
		return this.parent_album ? this.parent_album.title : '';
	}
}
