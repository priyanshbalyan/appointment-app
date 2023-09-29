# Commands

Install dependencies with

```yarn```

Start app in dev mode

```yarn start```

Start backend only

```yarn backend```

Run tests

```yarn test```

Build client files

```yarn build```

Launch production build (Access at http://localhost:8000)

```yarn production```


# Technologies used

- React
- Typescript
- CSS modules
- Redux Toolkit
- React Testing library
- React Router
- Font Awesome Icons
- ESLint
- Prettier


# Architecture & Strategies

1. Absolute imports - Long relative import paths can become confusing and hard to manage. Absolute imports eliminate the need to keep track of complex directory structures.

2. Redux Toolkit - Simplify syntax for defining Redux logic by using Redux toolkit which provides a createSlice function that reduces the amount of boilerplate code needed to define reducers and actions.

3. Features - Keeping related components, tests and the associated Redux store in the same directory, promoting encapsulation and modularity. Helps in setting a clear boundary between different features of the application, making it easier to develop.

4. Separation between pages and features - Maintaining a clear separation between pages and component allows for scaling of the application by adding new pages and reusing existing components

5. Typescript and ESLint - Helps in early catching common programming errors time and enforces coding consistency and standards.

6. API retry - Add API retries as network connections might be unstable and reduce connectivity issues.

7. Unit tests and coverage - Help identify and prevent bugs early in the development cycle, enhance code quality, and provide a safety net when making changes. Code coverage measures the degree of unit tests covering the codebase, highlighting areas that lack testing.

8. React Testing library - Use the new react testing library to write unit tests for components which offer advantages over enzyme testing such as realistic testing scenarios, make tests less brittle and more resilient to changes.


# Requirements

* Is the application implemented using TypeScript and passing tests and Lint? - Done
  * Make sure your code is expecting production and could be maintained. - Done
  * Please prepare the production build command assuming a production deploy. - Done
* Does the application meet the minimum requirements as below? - Done


# Minimum requirements
1. The default view for the application is the Item List page. - Done
2. When an item on the Item List page is clicked, the application should navigate to the Item Detail page. - Done
3. Navigating directly to an Item Detail page by URL should be possible. - Done
4. Implement the Item List and Item Detail pages according to the design specification, and reproduce the UI as much as possible. - Done
5. Implement the search form on the Item List page and filter the items by the string entered. - Done
6. Implement the category tabs on the Item List page and filter the items by the category clicked. - Done
   1. please add "all (すべて)" menu to category menu to display non-filtered items. - Done

7. Use the provided [API](./API.md) for showing the items. - Done
8. Use English for communication, commit messages, and comment. - Done
9. Describe the architecture and strategy you have adopted on `README.md`. - Done