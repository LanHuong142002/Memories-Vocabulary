# Practice Four ReactJS

- This document provides information about practice-four ReactJS
- Design: [here](https://memories-vocabulary.netlify.app/)
- Estimate plan: [plan](https://docs.google.com/document/d/1dFwQtIHf1pZTM7T3i2Qbv8LF3KPstZSISiIwZk3KVHU/edit?usp=sharing)
- Documents requirements: [requirements](https://docs.google.com/document/d/1DtXOra91pnsg6qh-C48Qs-X6eBv2cvOYrV-u6RdsDx8/edit?usp=sharing)

## App bio

- Vocabulary is a website that stores vocabulary and it has a small test to reinforce vocabularies. After doing the small test, Vocabulary will show a table result about your test

## Targets

- Improvement logic code, performance app
- Apply husky and pre-commit
- Unit testing (Coverage ≥ 80%)
- Using [mock api](https://mockapi.io/), Axios and deploy the app to Vercel

## Requirements

1. Vocabulary list
   - User can see existing topics with the total number of words in the topic
   - User can add new topics when clicking on Add Topic button
   - User can make Vocabulary with Translation
   - User can delete a row when clicking on the “X” button
2. Testing mode
   - User can save the Vocabulary list when clicking on the Start Test button
   - Show users one word at a time in their native language
   - Users should submit the translation of the word
   - Submitting the translation will then shows the next word
   - Show a progress bar to indicate the words completed
   - When all vocabulary is complete, bring the user to view their results.
3. Test results
   - Calculate the results (hit ratio), shows the percentage of hits, and a table showing all tested words together with the translation and the user's input.
   - Every row should have a visual indication if the word was a hit or a miss.
   - Users can return to their vocabulary list.
4. Light/Dark mode
   - User can change dark/ light theme

## Information

- Timeline
  - Estimate days: 9 days
  - Actual days: 20.5 days
- Dev: 1

## Tech stacks

### Languages

- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5): is the standard markup language for Web pages. With HTML you can create your own Website.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS): is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.
- [JavaScript](https://www.w3schools.com/js/): is a scripting or programming language that allows you to implement complex features on web pages.
- [TypeScript](https://www.typescriptlang.org/): is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

### Frameworks

- [ReactJS](https://reactjs.org/): is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

### Testing Frameworks

- [Jest](https://jestjs.io/)/[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Jest is a testing framework, and React Testing Library is a set of utilities for testing React components.

### Libraries:

- [Axios](https://axios-http.com/): A popular library for making HTTP requests in JavaScript applications.

### Development Tools:

- [Mock API](https://mockapi.io/): A service that allows you to simulate and test API responses in a controlled manner.
- [Storybook](https://storybook.js.org/): A tool for developing UI components in isolation, providing a sandbox environment for your components.
- [Vite](https://vitejs.dev/): is a build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Eslint](https://eslint.org/): statically analyzes code to quickly find problems. It is built into most text editors and developers can run ESLint as part of your continuous integration pipeline.
- [Husky](https://typicode.github.io): improves your commits and more! You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.
- [Commitlint](https://commitlint.js.org/): supports checking a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.
- [Prettier](https://prettier.io/): removes all original styling\* and ensures that all outputted code conforms to a consistent style.

## Getting Started

- Step 1: Clone repository
  - With SSH:
    - `$ git clone git@gitlab.asoft-python.com:huong.le/react-training.git`
- Step 2: `cd react-training`
- Step 3: Move to branch feat/practice-four
  - `$ git checkout feat/practice-four`
- Step 4: `cd react/practice-four`
- Step 5: `pnpm install` to install dependencies
- Step 6: Follow to command lines below

| Command              | Action                                               |
| :------------------- | :--------------------------------------------------- |
| `pnpm run dev`       | Start local dev server at `http://127.0.0.1:5173/`   |
| `pnpm run build`     | Build your production site to `./dist/`              |
| `pnpm run storybook` | Run Storybook and show it at `http://localhost:6006` |
| `pnpm run jest`      | Run unit test                                        |

## Prerequisites

- Make sure you install packages that have the same version below. We just supported this version, not sure if the higher or lower version will work fine:
  - Node version: `v16.16.0`
  - Pnpm: `v8.2.0`

## Secrets

- Create file .env has the same level as .env.sample. After that, please contact me to get the key
