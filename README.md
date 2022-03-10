# Nodejs-playground

### Prerequisites:
* Node

### Build and run

To run the application execute the following command:  ```node app.js``` 

### Docker

* _Docker compose_: ```docker compose up -d``` 

* _Buil and run image_:

  * Build: ```docker build --tag node-docker``` ;
  * Run with port forward: ```docker run --publish 3000:3000 node-docker``` ;
  
### Tests 
Inside package.json a script for jest testing was added so in order to run the tests use the command: ```npm test```
