import * as React from 'react';
import * as renderer from 'react-test-renderer/shallow';

import AlbumContainer from '../album-container';

describe('<Album path="/" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumContainer path="/" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});

describe('<Album path="2000" /> = Loading', () => {
	it('renders', () => {
		const result: any = renderer
			.createRenderer()
			.render(<AlbumContainer path="2000" />);
		expect(result.props.children).toMatch(/Loading/);
	});
});
