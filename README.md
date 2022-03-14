# Nodejs-playground

### Prerequisites:
* Node

### Build and run

To run the application execute the following command:  ```node app.js``` 

### Docker

* _Docker compose_: ```docker compose up -d``` 
  * _Cleanup_: ```docker compose down --rmi all```

* _Buil and run image_:

  * Build: ```docker build --tag node-image .``` 
  * Run with port forward: ```docker run --name node-container -p 3000:3000 node-image``` 
  * Cleanup: ```docker rm -f node-container && docker image rm node-app-image```
  
### Tests 
Inside package.json a script for jest testing was added so in order to run the tests use the command: ```npm test```
