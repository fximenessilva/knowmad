# Podcaster

Podcaster is a small app that allows users to listen to podcasts

## Directory Structure

The Podcaster app follows a logical directory structure that promotes organization and separation of concerns. Below is an overview of the main directories and their purposes:

* **src**: This directory contains the source code of the Podcaster app.
  * **components**: Contains reusable UI components used throughout the app.
    * **common**: Contains layout components that can be reused throughout the app.
    * **utils**: Contains components with functionality that can be reused throughout the app.
    * **views**: Contains the main views or pages of the app.
  * **contexts**: Holds the Context API related files, including context providers and consumers.
  * **styles**: Contains global stylesheets for styling the app.


## Architecture

The Podcaster app follows a component-based architecture using the following technologies:

* React: A JavaScript library for building user interfaces.
* Context API: A built-in feature in React for managing global state and data sharing between components.
* useReducer: A React hook for managing complex state logic

The app's architecture promotes modularity, reusability, and maintainability of the codebase. Components are structured to handle specific functionality, and the global state management provided by the Context API and useReducer ensures efficient management of the app's state.

## Installation

Use the package manager to install the packages.

```bash
cd podcaster
npm install
```

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
