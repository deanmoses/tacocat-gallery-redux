import * as React from 'react';
import * as renderer from 'react-test-renderer/shallow';

import { AlbumContainer } from '../album-container';

describe('<Album albumPath="/" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumContainer albumPath="/" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});

describe('<Album albumPath="2000" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumContainer albumPath="2000" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});
