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

- `npm start` - Starts the application on port 3000.

- `npm test` - Runs the tests.

- `npm run build` - Builds the app for production to the `build` folder.

- `npm run eject` - Copies all the configuration file s(ebpack, Babel, ESLint, etc) to the project folder so you can customize them.
