import * as React from 'react';

/**
 * Wrapper around Bootstrap CSS icons
 */
interface IconProps {
	readonly name: string;
	onClick?: (x: any) => any;
}
export default class Icon extends React.Component<IconProps> {
	constructor(props: IconProps) {
		super(props);
		this.click = this.click.bind(this);
	}

	render() {
		return (
			<span
				className={'glyphicon glyphicon-' + this.props.name}
				onClick={this.click}
			/>
		);
	}

	click(x: any) {
		if (this && this.props.onClick) {
			this.props.onClick(x);
		}
	}
}
