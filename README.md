A HTML5/javascript single page application (SPA) front end for tacocat.com's photo site.

## Technologies

Uses the following technologies:

* [React.js](http://facebook.github.io/react/): a component-based Javascript View layer.
* [Redux](https://redux.js.org/): a state management system for React.js.
* [Redux Thunk](https://github.com/gaearon/redux-thunk): middleware for Redux to handle async actions like ajax calls.
* [TypeScript](https://www.typescriptlang.org/): strongly typed Javascript. It transpiles to browser Javascript.
* [Webpack](https://webpack.js.org/): a javascript build system.

Retrieves album data from tacocat's [ZenPhoto](http://www.zenphoto.org/) installation. Depends on this [prototype JSON REST backend](https://github.com/deanmoses/tacocat-gallery-zenphoto-rest-api).

## How To Work With Project

### Install prerequisites

1. [Git](http://git-scm.com/) - _source control tool. Needed to retrieve this project from github.com_
2. [Node.js](http://nodejs.org/) - _Node.js server. Needed to manage development tools & run dev webserver. Not used at runtime_

### Install project

1. `cd` to directory under which you want to create project
2. Get this project via `git clone [url to this project]`
3. `cd` into project
4. Install the project's npm dependencies: `npm install` _(must be in project root dir)_

### Run project

1. `cd` into project
2. Run project: `npm start`. This will compile the code and start a development web server.
3. Open browser to localhost. In the output of `npm start`, it'll tell you what port the web server's on.
4. In the browser you should the root gallery of tacocat.com. If you don't, look in your browser's javascript console for what's going on.

### Prod distribution project

To bundle project for prod use:

1. run `npm run build`. The bundled, minified project will be in `dist/`.
