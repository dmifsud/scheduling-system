This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install package dependencies:

```bash
yarn
# or
npm install
```

Then, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- NextJs (Handles SSR, routing and API)
- React
- Redux & Sagas (State management)
- TypeScript
- Material UI
- Formik & Yup (Form Validation)

## Prerequisites

Please make sure you have NodeJs installed globally on your machine. This was implemented using `v14.18.1` and also tested on both Linux (Ubuntu) and MacOS using Node `v16.19.0`.

Use `yarn` for best result.

## Backend server

Backend APIs are written as part of NextJS structure architecture. These can be found under `/pages/api/...`

As part of this prototype task, a mock/fake backend database was implemented that stores everything in a json file. I know, not very scalable, right? But works for a small task such as this. This was done mainly to minimise time required to implement such task and to have full absolute control of everything whilst focusing on the front end part. This data is found in `data.json`, however it is not modified during development. It serves only as an initial state structure. As soon as the app is used, a new `data.local.json` file is created.

## Testing

To test the app, the following credentials can be used:

email: `dmifsud@email.com`
pass: `test`

email: `jdoe@email.com`
pass: `test2`

Testing has been mainly done on Chrome during development.

As a bonus, the user actions in store can be monitored in real time using this [Chrome Extension Dev Tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to inspect Redux.

## Scalability

1. Use of REDUX
2. Use of Typings everywhere
3. Reusable components (although can be improved)
4. Use of layered services such as backend layer, saga layer, selectors, etc.

## Improvements

- Eslint
- Use of persistent store
- Proper use of a styling structure
- UI Responsiveness
- More thought out UX/UI design
- Centralized config file with different environments
- Unit tests
- Better error handling, especially in Login form
- Proper authentication mechanism
- File structure (due to this being a prototype, some things were still being evaulated and experimented and because of this some inconsistencies can be observed)

## Known Bugs

- When logging out, sometimes it doesn't redirect out to Login. This would need to be improved if/when a real backend and proper authentication mechanism is implemented

## Missing parts

- The view page for Game Presenters and Tables were not implemented, however, the backend api, and redux side of it has been.
- The automatic generation of a schedule in the main screen (currently this is a statically "pre-genererated" one for visualization purposes).
- Unit tests
- Dockerfile
