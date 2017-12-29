/**
 * React.js components that render the site's shell
 */

import * as React from 'react';
import Config from '@src/config';

/**
 * React.js component that renders the site shell
 */
interface PageProps {
	readonly className?: string;
	readonly showFooter?: boolean;
}
export const Page: React.StatelessComponent<PageProps> = ({
	children,
	className = '',
	showFooter = true
}) => {
	var classes = 'pagecontents';
	if (className) {
		classes += ' ' + className;
	}
	return (
		<div>
			<div className={classes}>{children}</div>
			{showFooter && (
				<div className="footer hidden-xs hidden-sm">
					<img src="images/tacocat-logo.png" width="102px" height="19px" />
				</div>
			)}
		</div>
	);
};

/**
 * React.js component that renders the site's header bar with title
 */
export interface HeaderTitleProps {
	readonly title?: string;
	readonly href?: string;
	readonly showTitle?: boolean;
}
export const HeaderTitle: React.StatelessComponent<HeaderTitleProps> = ({
	title = '',
	href = '',
	showTitle = true
}) => {
	var derivedTitle = (
		<a className="navbar-brand" href={href}>
			{title}
		</a>
	);

	return (
		<div>
			<nav className="header navbar" role="navigation">
				<div className="navbar-header">{derivedTitle}</div>
				<div className="header-controls hidden-xxs">
					{showTitle && (
						<span className="hidden-xs site-title">{Config.siteTitle()}</span>
					)}
					{/*props.showSearch && (
						<span className="search-button">
							<Site.SearchButton returnPath={props.path} />
						</span>
					)*/}
				</div>
			</nav>
			{
				//<Site.HeaderButtons>{props.children}</Site.HeaderButtons>
			}
		</div>
	);
};
