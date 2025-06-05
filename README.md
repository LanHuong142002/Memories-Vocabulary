
# REACT TRAINING

# REACT TRAINING PLAN

## TIMELINE:

- Create React App, Main Concepts, and React Hooks: 22 days
- Advanced Guides: 12 days

## CREATE A NEW REACT APP:

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

## MAIN CONCEPTS:

Step by step learning the main concepts. For any examples you found in the documentation, you can try them in your first React app created above.

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [Forms](https://reactjs.org/docs/forms.html)
- [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
- [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

## STORYBOOK

- Try to create a Storybook for your example components. [link](https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component/)

### PRACTICE

- Apply what you have read to rewrite your previous HTML/CSS practice into React components.
- Apply Storybook to your practice.

## REACT HOOKS

- [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)
- [useState Hook](https://reactjs.org/docs/hooks-state.html)
- [useEffect Hook](https://reactjs.org/docs/hooks-effect.html)
- [useContext Hook](https://reactjs.org/docs/hooks-reference.html#usecontext)
- [useRef Hook](https://reactjs.org/docs/hooks-reference.html#useref)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

### PRACTICE

This practice will let you understand simple flow in React:

- Using React hooks
- Filter and edit the list of products
  - Use JSON server to create data
  - User filters by column values
  - User edits/deletes product item

## ADVANCED GUIDES

Some highlight topics need more focus:

- [Code-Splitting](https://reactjs.org/docs/code-splitting.html)
- [lazy](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html) (not commonly used in modern React, just read as reference)
- [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Profiler](https://react.dev/reference/react/Profiler)
- [Controlled and uncontrolled components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) ([input](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable), [select](https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable), [textarea](https://react.dev/reference/react-dom/components/textarea#controlling-a-text-area-with-a-state-variable))
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### DATA FETCHING

- [SWR](https://swr.vercel.app/) - React Hooks for Data Fetching
  - [Getting Started](https://swr.vercel.app/docs/getting-started) - use pnpm to install instead of npm/yarn
  - [Global Configuration](https://swr.vercel.app/docs/global-configuration)
  - [Data Fetching](https://swr.vercel.app/docs/data-fetching)
  - [Error Handling](https://swr.vercel.app/docs/error-handling)
  - [Auto Revalidation](https://swr.vercel.app/docs/revalidation)
  - [Pagination](https://swr.vercel.app/docs/pagination)

### UNIT TESTING

Supporters should give a brief introduction to unit testing and how to set it up.

- [Testing Overview](https://reactjs.org/docs/testing.html)
  - [Jest](https://jestjs.io/)
  - [React Test Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [Test Utilities](https://reactjs.org/docs/test-utils.html)
- [Testing Recipes](https://reactjs.org/docs/testing-recipes.html)
- [Testing environments](https://reactjs.org/docs/testing-environments.html)

### PRACTICE

- Features:

  - Adding more features for practice 2
  - User adds & deletes a product
  - User deletes a product
  - User opens the product detail page
  - User edits product information on the product detail page
  - Product data will be kept when refreshing the page

- Targets:

  - Apply useContext, useReducer for state management
  - Apply error boundary
  - Apply SWR for fetching data - from a simple json-server
  - Unit test coverage should be greater than 80%

## REFERENCES

- Debugging Tools
  - React perf
  - Reactotron
- State Management
  - Redux
    - Redux logger
    - Redux DevTools
  - Mobx
- React Component libraries
  - [Chakra UI](https://chakra-ui.com/)
  - [Material UI](https://mui.com/)
  - [React Bootstrap](https://react-bootstrap.github.io/)
  - [Ant Design](https://react-bootstrap.github.io/)
- React Router
  - [React Router v6](https://reactrouter.com/)
