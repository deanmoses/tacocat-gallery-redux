/**
 * Configuration global to the application
 */
export default abstract class Config {
	public static siteTitle(): string {
		return 'Dean, Lucie, Felix and Milo Moses';
	}

	public static siteShortTitle(): string {
		return 'The Moses Family';
	}

	// Base host of the live non-CDN webserver.  The origin server.
	public static liveHost(): string {
		return 'https://tacocat.com';
	}

	// Base host of CDN-servable stuff. Could be a CDN or may be the actual webserver.
	public static cdnHost(): string {
		return 'https://cdn.tacocat.com';
	}

	/**
	 * URL of the JSON REST API from which to retrieve the album
	 */
	public static jsonAlbumUrl(path: string): string {
		// For JSON requests to zenphoto, always end with a / or else suffer the cost of a redirect.
		// Zenphoto has a stupid redirect in its .htaccess that redirects you to the / version of
		// an album.
		// Request THIS:
		// https://tacocat.com/zenphoto/2005/11-20/?json
		// NOT this:
		// https://tacocat.com/zenphoto/2005/11-20?json

		let newPath = path.endsWith('/') ? path : path + '/';
		newPath = path.startsWith('/') ? path : '/' + path;
		return 'https://tacocat.com/zenphoto' + newPath + '?json';
	}

	/**
	 * URL you can hit to update the JSON cache of a specific album
	 */
	public static refreshAlbumCacheUrl(albumPath: string): string {
		// strip the '/' off if it exists
		var slashlessAlbumPath = albumPath.replace('/', '');
		return this.liveHost() + '/p_json/refresh.php?album=' + slashlessAlbumPath;
	}

	public static zenphotoBaseUrl(): string {
		return 'https://tacocat.com/zenphoto/';
	}

	public static zenphotoImageFullSizeUrl(imagePath: string): string {
		return 'https://tacocat.com/zenphoto/albums/' + imagePath;
	}

	public static zenphotoImageViewUrl(imagePath: string): string {
		return 'https://tacocat.com/zenphoto/' + imagePath;
	}

	public static zenphotoImageEditUrl(
		albumPath: string,
		imageFilename: string
	): string {
		var zeditUrl =
			'https://tacocat.com/zenphoto/zp-core/admin-edit.php?page=edit&tab=imageinfo&album=ALBUM_PATH&image=IMAGE_FILENAME#IT';
		return zeditUrl
			.replace('ALBUM_PATH', encodeURIComponent(albumPath))
			.replace('IMAGE_FILENAME', encodeURIComponent(imageFilename));
	}

	public static zenphotoAlbumEditUrl(albumPath: string): string {
		return (
			'https://tacocat.com/zenphoto/zp-core/admin-edit.php?page=edit&album=' +
			encodeURIComponent(albumPath)
		);
	}

	public static staticAlbumUrl(albumPath: string): string {
		// format: 2001/12-31
		// new format: 2001/12/31
		return 'https://tacocat.com/pix/' + albumPath.split('-').join('/') + '/';
	}
}
