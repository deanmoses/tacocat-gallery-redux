/**
 * React.js components that render the site's shell
 */

import * as React from 'react';
import Config from '@src/config';
import Icon from '@src/components/icon';

/**
 * Shell of a page
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
 * Page's header bar with title
 */
export interface HeaderTitleProps {
	readonly title?: string;
	readonly href?: string;
	readonly showTitle?: boolean;
	readonly showSearch?: boolean;
}
export const HeaderTitle: React.StatelessComponent<HeaderTitleProps> = ({
	title = '',
	href = '',
	showTitle = true,
	showSearch = true
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
					{showSearch && (
						<span className="search-button">
							<SearchButton />
						</span>
					)}
				</div>
			</nav>
			{
				//<Site.HeaderButtons>{props.children}</Site.HeaderButtons>
			}
		</div>
	);
};

/**
 * Full page message component
 */
interface FullPageMessageProps {
	readonly children: any;
}
export const FullPageMessage: React.StatelessComponent<
	FullPageMessageProps
> = ({ children }) => (
	<div className="fullPageMessage">
		<p>{children}</p>
	</div>
);

/**
 * Search icon for navigating to search screen
 */
interface SearchButtonProps {
	readonly searchTerms?: string;
	readonly returnPath?: string;
}
export const SearchButton: React.StatelessComponent<SearchButtonProps> = ({
	searchTerms,
	returnPath
}) => {
	var searchUrl = '#search:';
	searchUrl += searchTerms ? encodeURIComponent(searchTerms) : '';
	searchUrl += '&return:';
	searchUrl += returnPath ? encodeURIComponent(returnPath) : '';
	return (
		<a href={searchUrl}>
			<Icon name="search" />
		</a>
	);
};
