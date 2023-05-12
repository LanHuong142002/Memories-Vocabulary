# Practice Three ReactJS

- This document provides information about practice-three ReactJS
- Custom design: [design](https://www.figma.com/file/fqGqgxSYVOYZkhXanE7JqH/Management-Products?type=design&node-id=362-2032&t=7VCAhpO4HxYsz9bn-0)
  - Follow three designs here:
    - List page: [Table UI 3.0 | Variants Update (Community) – Figma](<https://www.figma.com/file/sl1LCYYdr3IA0IPEIrDvw5/Table-UI-3.0-%7C-Variants-Update-(Community)?type=design&node-id=0-1&t=e29TceSxSSgJgTmm-0>)
    - Modal: [❖ 70+ modals & popups UI Kit – Untitled UI | Figma Community](https://www.figma.com/community/file/1160004185821594377/%E2%9D%96-70%2B-modals-%26-popups-UI-Kit-%E2%80%93-Untitled-UI)
    - Detail page: [Checkout Page (Cosmetics) | Figma Community](<https://www.figma.com/community/file/1077821512205610385/Checkout-Page-(Cosmetics)>)
- Estimate plan: [plan](https://docs.google.com/document/d/1ejWpoYmnOAy2V4DIZ3Ps23esmxM6fFkx8Oy5fX-qFd0/edit#)
- Documents requirements: [requirements](https://docs.google.com/document/d/1nicJp3vZAjJt7b4xhJC0eUBWE_T3Qso1mheNe4_Hq0I/edit#)

### App bio

- Products Management is a website application that can help you manage your products like adding new, editing, deleting, filter product

### Targets

- Apply ReactJS knowledge to practice (extends from practice #1 and practice #2)
- Code splitting
- Apply error boundaries to catch errors
- Apply useContext and useReducer for state management
- Apply SWR for fetching data - from a simple JSON-server
- Unit test coverage as much as possible (at least 80%)

### Requirements

- Trainee customizes designs to fit business needs
- Build a product management site with React
- User can view a list of all products in a table
- User can add/update/delete a product
- User can view a product on the detail page
- User can filter products by each column
- User can edit product information on the detail page

### Information

- Timeline
  - Estimate day: 9 days
  - Actual day:
- Techniques Stack:
  - [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)/[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [JavaScript](https://www.w3schools.com/js/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ReactJS](https://reactjs.org/)
  - [Storybook](https://storybook.js.org/)
  - [JSON Server](https://github.com/typicode/json-server)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Development Tools:
  - [Vite](https://vitejs.dev/)
  - [Eslint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
- Editor: Visual Studio Code.

### Main App Features:

- User can view a list of products
- User can filter products by each column
- User can add a new product
- User can edit a product
- User can delete a product
- User can view a product on the detail page
- User can edit product information on the detail page

### Development Environment

- Node v16.16
- pnpm v8.2.0
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
- Step 3: Move to branch feat/practice-three
  - `$ git checkout feat/practice-three`
- Step 4: `cd  react/practice-three`
- Step 5: Now you need to install packages
  - `$ pnpm i`
- Step 6:
  - To see website run: `$ pnpm run dev`
  - To see Storybook run: `$ pnpm run storybook`
- Step 7:
  - http://127.0.0.1:4000/ to see the website
  - http://localhost:6006 to see Storybook

### Secrets

- Create file .env has the same level as .env.example. After that, please contact me to get the key
