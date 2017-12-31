import * as DateUtils from '@src/date-utils';

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

	constructor(path: string) {
		this.path = path;
	}

	static fromObject(json: any): Alb {
		let alb = Object.create(Alb.prototype);
		return Object.assign(alb, json);
	}

	private get type(): AlbumType {
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

	getTitle() {
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
}
