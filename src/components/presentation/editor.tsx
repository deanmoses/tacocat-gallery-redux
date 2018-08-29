import * as React from 'react';
import { ReactQuill } from 'react-quill';
import { MyLink } from '@src/components/presentation/quill-link';

// This is simply to use MyLink so that TypeScript compiler doesn't complain
// Importing MyLink is simply so that it loads in the module and registers
// the MyLink class with the Quill editor, to customize the handling of hrefs.
MyLink;

/**
 * Component properties
 */
interface ComponentProps {
	/**
	 * The text / HTML to display
	 */
	readonly html: string;

	/**
	 * Optional CSS classes to display
	 */
	readonly className?: string;

	/**
	 * Called when my text / HTML content changes
	 */
	readonly onHtmlChange?: (html: string) => void;
}

/**
 * Rich text editor component.
 * Built over the Quill.js rich text editor.
 * It was kind of hell to get it working, but there weren't any other better options.
 * See my Evernote on what I had to do in the react-quill node module source code to get it to work.
 */
export const Editor: React.StatelessComponent<ComponentProps> = ({
	html,
	className,
	onHtmlChange
}) => {
	let onChange = (_content: any, _delta: any, _source: any, editor: any) => {
		// Quill will issue an initial onChange when loading the page and setting the text
		// the first time.  To avoid this, only look at events that come from the user 
		// (that's _source === 'user' rather than _source === 'api').  For more info, see
		// https://github.com/zenoamaro/react-quill/issues/259
		if (onHtmlChange && _source === 'user') {
			onHtmlChange(editor.getHTML());
		}
	};
	return (
		<ReactQuill
			theme="bubble" // The "bubble" theme is the one that makes the toolbar pop up when text is selected, rather than be there permanently
			modules={modules}
			formats={formats}
			value={html}
			className={className}
			onChange={onChange}
		/>
	);
};

const modules = {
	// Items in the Quill.js editor toolbar
	toolbar: [
		['bold', 'italic', 'underline'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link']
	]
};

// What formatting the Quill.js editor allows, whether via the toolbar
// or via keystroke commands (or pasting content in?)
const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'list',
	'bullet',
	'link'
];
