A HTML5/javascript single page application (SPA) front end for tacocat.com's photo site.  

## Technologies
Uses the following technologies: 
* [React.js](http://facebook.github.io/react/):  A component-based Javascript View layer.
* [Typescript](https://www.typescriptlang.org/): Strongly typed Javascript, transpiles to browser Javascript.
* [Webpack](https://webpack.js.org/): A javascript build system.

Retrieves album data from tacocat's [ZenPhoto](http://www.zenphoto.org/) installation.  Depends on this prototype JSON REST backend ([github](https://github.com/deanmoses/tacocat-gallery-zenphoto-rest-api)).

## How To Work With Project

### Install prerequisites
1. [Git](http://git-scm.com/) - *source control tool.  Needed to retrieve this project from github.com*
2. [Node.js](http://nodejs.org/) - *Node.js server.  Needed to manage development tools & run dev webserver.  Not used at runtime*

### Install project
1. `cd` to directory under which you want to create project
2. Get this project via `git clone [url to this project]`
3. `cd` into project
4. Install the project's npm dependencies: `npm install` *(must be in project root dir)*

### Run project
1. `cd` into project
2. Run project: `npm start`.  This will compile the code and start a development web server.
3. Open browser to localhost.  In the output of `npm start`, it'll tell you what port the web server's on.
4. In the browser you should the root gallery of tacocat.com.  If you don't, look in your browser's javascript console for what's going on.

### Prod distribution project
To bundle project for prod use:
1. run `npm run build`.  The bundled, minified project will be in `dist/`.