/**
 * Interfaces for the application state
 */

export interface AlbumsByPath {
	[albumPath: string]: Album;
}

export interface Album {
	path: string;
	isLoading?: boolean;
	err?: string;
}

export interface FullAlbum extends Album {
	title: string;
	summary: string;
	description: string;
	image_size: number;
	thumb_size: number;
	thumb: string;
	date: number;
	images?: (Image)[] | null;
	parent_album: AlbumNavInfo;
	next: AlbumNavInfo;
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
