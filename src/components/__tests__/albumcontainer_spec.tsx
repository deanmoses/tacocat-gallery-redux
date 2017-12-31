import * as React from 'react';
import * as renderer from 'react-test-renderer/shallow';

import { AlbumPage } from '../albumcontainer';

describe('<Album albumPath="/" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumPage albumPath="/" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});

describe('<Album albumPath="2000" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumPage albumPath="2000" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});
