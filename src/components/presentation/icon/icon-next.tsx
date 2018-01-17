import * as React from 'react';
import { Icon, IconProps } from '@src/components/presentation/icon/icon';

export const NextIcon: React.SFC<IconProps> = ({ onClick, title }) => (
	<Icon
		path="M749 551l-551 551L0 904l353-353L0 198 198 0z"
		viewBox="0 0 749 1102"
		onClick={onClick}
		title={title}
	/>
);
