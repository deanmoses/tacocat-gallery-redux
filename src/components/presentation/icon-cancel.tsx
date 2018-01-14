import * as React from 'react';
import { Icon, IconProps } from '@src/components/presentation/icon';

export const CancelIcon: React.SFC<IconProps> = ({ onClick }) => (
	<Icon
		path="M794 7l178 179q8 8 8 18.5t-8 17.5L705 490l267 268q8 7 8 17.5t-8 18.5L794 972q-8 8-18.5 8t-17.5-8L490 705 222 972q-7 8-17.5 8t-18.5-8L8 794q-8-8-8-18.5T8 758l267-268L8 222q-8-7-8-17.5T8 186L186 8q8-8 18.5-8T222 8l268 267L758 7q7-7 17.5-7T794 7z"
		viewBox="0 0 980 980"
		height="0.85em"
		width="0.85em"
		onClick={onClick}
	/>
);
