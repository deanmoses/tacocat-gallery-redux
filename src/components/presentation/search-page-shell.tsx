import * as React from 'react';
import * as Site from '@src/components/presentation/site';
import { CircleArrowLeftIcon } from '@src/components/presentation/icon/icon-circle-arrow-left';

/**
 * Component properties
 */
interface ComponentProps {
	readonly returnPath: string;
	readonly searchTerms?: string;
	readonly onSearch?: (event: any) => void;
	readonly children?: any;
}

/**
 * Shell of search page
 */
export class SearchPageShell extends React.Component<ComponentProps> {
	/**
	 * Constructor is invoked once, before the component is mounted
	 */
	constructor(props: ComponentProps) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	/**
	 * Handle the user submitting the search form
	 * by setting the new search terms on the URL.
	 *
	 * The actual searching will be done when the
	 * component is re-rendered because of the URL change.
	 */
	handleSearch(e: any) {
		e.preventDefault();
		const searchBox = this.refs.searchBox as any;

		let searchTerms = encode(searchBox.value.trim());
		if (!!searchTerms) {
			searchTerms = '/' + searchTerms;
		}

		let returnPath = encode(this.props.returnPath);
		if (!!returnPath) {
			returnPath = '/return:' + returnPath;
		}

		const searchUrl = 'search' + searchTerms + returnPath;
		window.location.hash = searchUrl;
	}

	render() {
		const returnPath = this.props.returnPath;
		const searchTerms = this.props.searchTerms;
		const children = this.props.children;

		return (
			<Site.Page showFooter={false}>
				<nav className="header navbar">
					<div className="navbar-header">
						<a className="navbar-brand" href={'#' + returnPath}>
							<CircleArrowLeftIcon />
						</a>
					</div>
					<div className="header-controls search-form">
						<form onSubmit={this.handleSearch} className="">
							<input
								type="text"
								placeholder="search"
								defaultValue={searchTerms}
								ref="searchBox"
								autoFocus
							/>
							<button type="submit" className="btn btn-default btn-sm">
								Search
							</button>
						</form>
					</div>
				</nav>
				{children}
			</Site.Page>
		);
	}
}

/**
 * URI encode the string, or if undefined, return ''
 * @param s the string to URI encode
 */
function encode(s: string): string {
	return !s ? '' : encodeURIComponent(s);
}
