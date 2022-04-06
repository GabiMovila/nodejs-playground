# Nodejs-playground

### Prerequisites:

- Node

### Build and run

To run the application execute the following command: `node app.js`

### Docker

- _Docker compose_: `docker compose up -d`

  - _Cleanup_: `docker compose down --rmi all`

- _Buil and run image_:

  - Build: `docker build --tag node-image .`
  - Run with port forward: `docker run --name node-container -p 3000:3000 node-image`
  - Cleanup: `docker rm -f node-container && docker image rm node-app-image`

### Tests

Inside package.json a script for jest testing was added so in order to run the tests use the command: `npm test`

### Typescript

The application is written using TypeScript and ESLint with airbnb config. All the dependencies for that are available as dev dependencies on _package.json_.

### Connecting to database

The application uses Mongodb as a database. </br>
In order to connect to it set the "DB_USERNAME", "DB_PASSWORD", "DB_HOST" and "DB_PORT" inside the .env file to the actual credentials used to connect to your Mongodb server.

# Getting Started without Create React App

1. Use npm init to create _package.json_
2. Create an index HTML, which react will use to render the app
3. Install babel to transform code into more traditional JS code
   - babel-env -> transforms ES6, and babel-react transforms JSX
   - create .babelrc config file telling what presets to use
4. Install webpack -> bundle the project ??? and used for reload on save
   - add webpack config
5. Install react and react-dom packages
   -Add App.js and index.js (App is simply a React component and index.js renders that component into the "root' element of the DOM defined in index.hml)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
