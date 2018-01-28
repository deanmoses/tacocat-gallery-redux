//
// This is not an action creator, but a helper method used by several action creators
//

import Config from '@src/utils/config';

/**
 * Update the album's cached JSON file on the server
 * @param albumPath path of the album
 */
export function updateAlbumServerCache(albumPath: string) {
	// Configure the HTTP POST
	let requestConfig: RequestInit = {
		method: 'POST',
		headers: {
			Accept: 'application/json'
		},
		cache: 'no-store'
	};
	return fetch(Config.refreshAlbumCacheUrl(albumPath), requestConfig)
		.then(response => {
			if (response.status !== 200)
				throw new Error('Error fetching: ' + response.statusText);
			return response;
		})
		.then(response => response.json())
		.then(json => {
			if (json.status !== 'success')
				throw new Error('Error refreshing cache for album ${albumPath}');
			return json;
		})
		.then(() => {
			console.log(`Success refreshing cache for album ${albumPath}`);
		})
		.catch(error => {
			console.log(error);
		});
}
