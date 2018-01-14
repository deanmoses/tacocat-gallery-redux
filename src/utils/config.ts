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

		let newPath = path ? path : '/'; // root path
		newPath = newPath.endsWith('/') ? newPath : newPath + '/';
		newPath = newPath.startsWith('/') ? newPath : '/' + newPath;
		return 'https://tacocat.com/zenphoto' + newPath + '?json';
	}

	/**
	 * URL of the JSON REST API to retrieve the latest album
	 */
	public static latestAlbumJsonUrl(): string {
		return 'http://tacocat.com/zenphoto/?json&latest_albums&depth=0';
	}

	/**
	 * URL of the JSON REST API to check the user's authentication status
	 */
	public static checkAuthenticationJsonUrl(): string {
		return 'https://tacocat.com/zenphoto/?api&auth';
	}

	/**
	 * URL of the JSON REST API to save an album
	 * @param albumPath path of an album
	 */
	public static jsonAlbumSaveUrl(albumPath: string): string {
		// Not having the final slash messes up POSTing to the edit URL,
		// because as of late 2016 zenphoto started redirecting
		// to the version with the slash.
		var finalSlash = albumPath.endsWith('/') ? '' : '/';
		return 'https://tacocat.com/zenphoto/' + albumPath + finalSlash;
	}

	/**
	 * URL of the JSON REST API to search for the specified terms
	 * @argument searchTerms the terms to search for
	 */
	public static jsonSearchUrl(searchTerms: string): string {
		return (
			'https://tacocat.com/zenphoto/page/search?words=' +
			encodeURIComponent(searchTerms) +
			'&json'
		);
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

	/**
	 * URL to view an album or image in the default Zenphoto experience
	 *
	 * @param path path to an album or image
	 */
	public static zenphotoViewUrl(path: string): string {
		return 'https://tacocat.com/zenphoto/' + path;
	}

	/**
	 * URL to the full Zenphoto image edit page
	 */
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

	/**
	 * URL to edit the ablum in the default Zenphoto experience
	 */
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
