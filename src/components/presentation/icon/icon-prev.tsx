import * as React from 'react';
import { Icon, IconProps } from '@src/components/presentation/icon/icon';

export const PrevIcon: React.SFC<IconProps> = ({ onClick, title }) => (
	<Icon
		path="M749 198L397 551l352 353-197 198L0 550 552 0z"
		viewBox="0 0 749 1102"
		onClick={onClick}
		title={title}
	/>
);
