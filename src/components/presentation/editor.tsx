import * as React from 'react';
import { ReactQuill } from 'react-quill';

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
}

function sendHtmlChangeEvent(newHtmlValue: string) {
	console.log('New HTML value: ', newHtmlValue);
}

/**
 * Rich text editor component
 */
export const Editor: React.StatelessComponent<ComponentProps> = ({
	html,
	className
}) => (
	<ReactQuill
		theme="bubble"
		modules={modules}
		formats={formats}
		value={html}
		className={className}
		onChange={sendHtmlChangeEvent}
	/>
);

const modules = {
	toolbar: [
		['bold', 'italic', 'underline'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link']
	]
};

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
