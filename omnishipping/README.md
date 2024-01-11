# Omnishipping

This is a component to integrate the shipping module in VTEX Checkout UI.

## Prerequisites

[Node.js](http://nodejs.org/) v8+ must be installed.

## Installation

- Running `yarn install` in the components's root directory will install everything you need for development.

## Demo Development Server

- `yarn start` will run a development server with the component's demo app at [http://qamarketplace.vtexlocal.com.br/:3000](http://qamarketplace.vtexlocal.com.br/:3000) with hot module reloading.

## Running Tests

- `yarn test` will run the tests once.

- `yarn run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `yarn run test:watch` will run the tests on every change.

- `yarn test -- --coverage --watch` will run tests on every change and generate coverage report in the console as well as in `coverage/` folder.