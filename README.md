# Running the project

## Prerequisites

- Node.js (LTS recommended)
- npm (ships with Node.js)

## Install

```sh
npm install
```

## Development server

```sh
npm run start
```

This starts `webpack-dev-server`, enables hot reload, and opens the site in your browser.
By default it listens on http://localhost:8080 unless your system chooses a different port.

## Production build

```sh
npm run build
```

The compiled assets are written to the output directory configured in `webpack.common.js`.

## Static HTML entry points

The project includes multiple HTML pages (for example: `index.html`, `routes.html`, `schedule.html`).
When using the dev server, you can open any of these directly via the browser.

