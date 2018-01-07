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
	year?: number;
	images?: Image[];
	albums?: AlbumThumb[];
	parent_album?: AlbumNavInfo;
	next?: AlbumNavInfo;
	isLoading?: boolean;
	err?: FetchError;
	type?: AlbumType;
	pageTitle?: string;
	href?: string;
	nextAlbumHref?: string;
	nextAlbumTitle?: string;
	prevAlbumHref?: string;
	prevAlbumTitle?: string;
	parentAlbumHref?: string;
	parentAlbumTitle?: string;
	getImage?: Function;
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

export interface Image extends Thumbable {
	nextImageHref: string;
	prevImageHref: string;
}

export interface AlbumNavInfo {
	path?: string;
	title?: string;
	date?: number;
}

export interface ImageNavInfo {
	path: string;
	title: string;
}

export enum AlbumType {
	ROOT = 'ROOT',
	YEAR = 'YEAR',
	DAY = 'DAY'
}

/**
 * Error for fetching from server
 */
export interface FetchError {
	/**
	 * Suitable for display to end user
	 */
	message: string;

	/**
	 * Type of error
	 */
	type: FetchErrorType;
}

/**
 * Types of errors that fetching from server can generate
 */
export enum FetchErrorType {
	NotFound = 'NotFound',
	Other = 'Other'
}

export class FetchErrorImpl implements FetchError {
	message: string;
	type: FetchErrorType;

	constructor(message: string, type?: FetchErrorType) {
		this.message = message;
		this.type = type ? type : FetchErrorType.Other;
	}
}
