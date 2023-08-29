# Practice Four ReactJS

- This document provides information about practice-four ReactJS
- Design: [here](https://memories-vocabulary.netlify.app/)
- Estimate plan: [plan](https://docs.google.com/document/d/1dFwQtIHf1pZTM7T3i2Qbv8LF3KPstZSISiIwZk3KVHU/edit?usp=sharing)
- Documents requirements: [requirements](https://docs.google.com/document/d/1DtXOra91pnsg6qh-C48Qs-X6eBv2cvOYrV-u6RdsDx8/edit?usp=sharing)

### App bio

- Vocabulary is a website that stores vocabulary and it has a small test to reinforce vocabularies. After doing the small test, Vocabulary will show a table result about your test

### Targets

- Improvement logic code, performance app
- Apply husky and pre-commit
- Unit testing (Coverage ≥ 80%)
- Using [mock api](https://mockapi.io/), Axios and deploy the app to Vercel

### Requirements

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

### Information

- Timeline
  - Estimate days: 18 days
  - Actual days:
- Techniques Stack:
  - [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)/[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [JavaScript](https://www.w3schools.com/js/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ReactJS](https://reactjs.org/)
  - [Storybook](https://storybook.js.org/)
  - [Mock API](https://mockapi.io/)
  - [Axios](https://axios-http.com/)
  - [Jest](https://jestjs.io/)/[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Development Tools:
  - [Vite](https://vitejs.dev/)
  - [Eslint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [Commitlint](https://commitlint.js.org/#/)
- Editor: Visual Studio Code.

### Development Environment

- Node v16.16
- pnpm v7.19.0
- ReactJS v18.2.0
- Storybook ReactJS v6.5.16
- Vite v3.1.3
- Eslint v8.35.0
- Prettier v2.8.3
- TypeScript v4.9.3

### Getting Started

- Step 1: Clone repository
  - With SSH:
    - `$ git clone git@gitlab.asoft-python.com:huong.le/react-training.git`
- Step 2: `cd react-training`
- Step 3: Move to branch feat/practice-four
  - `$ git checkout feat/practice-four`
- Step 4: `cd react/practice-four`
- Step 5: Now you need to install packages
  - `$ pnpm i`
- Step 6:
  - To see website run: `$ pnpm run dev`
  - To see Storybook run: `$ pnpm run storybook`
- Step 7:
  - http://127.0.0.1:4000/ to see the website
  - http://localhost:6006 to see Storybook

### Secrets

- Create file .env has the same level as .env.sample. After that, please contact me to get the key
