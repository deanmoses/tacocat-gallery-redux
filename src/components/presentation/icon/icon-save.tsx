import * as React from 'react';
import { Icon, IconProps } from '@src/components/presentation/icon/icon';

export const SaveIcon: React.SFC<IconProps> = ({ onClick }) => (
	<Icon
		path="M427 579L998 8q8-8 18-8t17 8l177 177q8 7 8 17t-8 18l-783 784q-7 8-17.5 8t-17.5-8L8 620q-8-8-8-18t8-17l177-177q7-8 17-8t18 8l171 171q7 7 18 7t18-7z"
		viewBox="0 0 1218 1012"
		onClick={onClick}
	/>
);
