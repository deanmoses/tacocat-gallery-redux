/**
 * React.js components that render the site's shell
 */

import * as React from 'react';
import Config from '@src/utils/config';
import { Icon, Icons } from '@src/components/presentation/icon';
import EditableText from '@src/components/containers/editable-text-connector';

/**
 * Shell of a page
 */
type PageProps = {
	readonly className?: string;
	readonly showFooter?: boolean;
	readonly year?: number;
};
export const Page: React.StatelessComponent<PageProps> = ({
	children,
	className = '',
	showFooter = true,
	year = 2018
}) => {
	return (
		<div id="page-container" data-year={year}>
			<div id="page-contents" className={className}>
				{children}
			</div>
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
type HeaderTitleProps = {
	readonly title?: string;
	readonly shortTitle?: string;
	/**
	 * Path for the purposes of showing the "go back" in search
	 */
	readonly path?: string;
	/**
	 * Path for the purposes of editing the title -- in Tacocat, only applies to images not albums
	 */
	readonly editPath?: string;
	readonly href?: string;
	/**
	 * Show the 'Dean, Lucie, Felix and Milo Moses' site title in the header, in addition to the page title
	 */
	readonly showSiteTitle?: boolean;
	readonly showSearch?: boolean;
	readonly children?: any;
};
export const HeaderTitle: React.StatelessComponent<HeaderTitleProps> = ({
	title,
	shortTitle,
	href,
	path,
	editPath,
	showSiteTitle = true,
	showSearch = true,
	children
}) => (
	<div>
		<nav className="header navbar" role="navigation">
			<div className="navbar-header">
				<PageTitle
					title={title}
					shortTitle={shortTitle}
					href={href}
					editPath={editPath}
				/>
			</div>
			<div className="header-controls hidden-xxs">
				{showSiteTitle && (
					<span className="hidden-xs site-title">{Config.siteTitle()}</span>
				)}
				{showSearch && (
					<span className="search-button">
						<SearchButton returnPath={path} />
					</span>
				)}
			</div>
		</nav>
		<HeaderButtons>{children}</HeaderButtons>
	</div>
);

/**
 * Page title
 */
type PageTitleProps = {
	readonly title?: string;
	readonly shortTitle?: string;
	readonly href?: string;
	readonly editPath?: string;
	readonly onTitleChange?: (newTitle: string) => void;
};
export const PageTitle: React.StatelessComponent<PageTitleProps> = ({
	title,
	shortTitle,
	href,
	editPath
}) => {
	// Set the browser title
	document.title = !!shortTitle
		? shortTitle
		: !!title ? title : Config.siteShortTitle();

	if (!!editPath) {
		return (
			<EditableText
				className="navbar-brand"
				text={title}
				field="title"
				path={editPath}
			/>
		);
	} else if (!!href) {
		return (
			<a className="navbar-brand" href={href}>
				{title}
			</a>
		);
	} else if (!shortTitle) {
		return <span className="navbar-brand">{title}</span>;
	} else {
		return (
			<span>
				<span className="navbar-brand hidden-xs">{title}</span>
				<span className="navbar-brand visible-xs">{shortTitle}</span>
			</span>
		);
	}
};

/**
 * Full page message component
 */
type FullPageMessageProps = {
	readonly children: any;
};
export const FullPageMessage: React.StatelessComponent<
	FullPageMessageProps
> = ({ children }) => <div className="fullPageMessage">{children}</div>;

/**
 * Search icon for navigating to search screen
 */
type SearchButtonProps = {
	readonly searchTerms?: string;
	readonly returnPath?: string;
};
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
			<Icon icon={Icons.SEARCH} />
		</a>
	);
};

/**
 * Row of header buttons
 */
type HeaderButtonsProps = {
	readonly children?: any;
};
export const HeaderButtons: React.StatelessComponent<HeaderButtonsProps> = ({
	children
}) => {
	if (!children) {
		return null;
	}
	return (
		<div>
			<div className="btn-group btn-group-justified" role="group">
				{children}
			</div>
		</div>
	);
};

/**
 * Header Nav Button Props used for multiple types of header buttons (prev / next)
 */
type HeaderNavButtonProps = {
	readonly href?: string;
	readonly title?: string;
};

/**
 * Prev Nav Button
 */
export const PrevButton: React.StatelessComponent<HeaderNavButtonProps> = ({
	href,
	title
}) => (
	<HeaderButton href={href}>
		<Icon icon={Icons.CHEVRON_LEFT} />{' '}
		<span className="nav-button-label">{title}</span>
	</HeaderButton>
);

/**
 * Next Nav Button
 */
export const NextButton: React.StatelessComponent<HeaderNavButtonProps> = ({
	href,
	title
}) => (
	<HeaderButton href={href}>
		<span className="nav-button-label">{title}</span>{' '}
		<Icon icon={Icons.CHEVRON_RIGHT} />
	</HeaderButton>
);

/**
 * Up Nav Button
 */
export const UpButton: React.StatelessComponent<HeaderNavButtonProps> = ({
	href,
	title
}) => (
	<HeaderButton href={href}>
		<Icon icon={Icons.HOME} /> <span className="nav-button-label">{title}</span>
	</HeaderButton>
);

/**
 * Header Button
 */
type HeaderButtonProps = {
	readonly href?: string;
	readonly children?: any;
};
export const HeaderButton: React.StatelessComponent<HeaderButtonProps> = ({
	href,
	children
}) => {
	if (href) {
		return (
			<a className="btn btn-default" href={href}>
				{children}
			</a>
		);
	} else {
		// else render with no href
		return <a className="btn btn-default disabled">{children}</a>;
	}
};
