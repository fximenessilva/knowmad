# Podcaster

Podcaster is a small app that allows users to listen to podcasts

## Installation

Use the package manager to install the packages.

```bash
cd podcaster
npm install
```


## Architecture

The Podcaster app follows a component-based architecture using the following technologies:

* React: A JavaScript library for building user interfaces.
* Context API: A built-in feature in React for managing global state and data sharing between components.
* useReducer: A React hook for managing complex state logic

The app's architecture promotes modularity, reusability, and maintainability of the codebase. Components are structured to handle specific functionality, and the global state management provided by the Context API and useReducer ensures efficient management of the app's state.

## Usage

To build the package in development mode, use the following command:

```
npm start

```

To start the package in production mode, use the following command:

```
npm run build
npx serve build
```

To run tests and collect coverage, use the following command:

```
npm test

```

To view the coverage report, use the following command after running tests:

```
npm run coverage

```
