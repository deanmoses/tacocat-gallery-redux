import * as React from 'react';
import { ReactQuill } from 'react-quill';

/**
 * Component properties
 */
interface ComponentProps {
	readonly html: string;
	readonly className: string;
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
