import { ReactQuill } from 'react-quill';
var Quill = require('quill');

var Link = Quill.import('formats/link');

/**
 * Removes the target="_blank" that Quill automatically adds to hrefs
 */
class MyLink extends Link {
	static create(value) {
		let node = super.create(value);
		value = this.sanitize(value);
		node.setAttribute('href', value);
		node.removeAttribute('target');
		return node;
	}
}

Quill.register(MyLink);

export { MyLink };
