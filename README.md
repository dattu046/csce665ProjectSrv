# csce665ProjectSrv
Test project and intergration test suite for payload classifier

## Project Environment
* NodeJS version 18.15.0
* Python version 3.9.13
* pip version 22.2.2
* npm version 9.5.0
* OS - Kali linux Linux 6.1.0-kali5-amd64

## This project contains the model server, sample application UI and backend, chrome extension and results viewer code.
* Model server code is wrapped in a python flask server
* The sample application UI is created using React.
* The sample application backend is created using NodeJS.
* The chrome extension is implemented using javascript with manifest v3.
* The result viewer code is also implemented using javascript and HTML.

## Folder Structure
* blog-post -> Sample application backend
* model-serv -> A python based model server
* my-app -> Sample application UI
* plugin -> Chrome extension
* results -> HTML page to view results when UI fields are not sanitized
* resultssan -> HTML page to view results when UI fields are sanitized
* CSCE665.postman_collection.json -> Postman collection to test for prototype pollution and HPA.

## Setup
* cd model-srv -> Python project
```
pip install -r requirements.txt
python model_server.py
```

* cd blog-post -> NodeJS project
```
npm install
npm run build
npm start
```
* cd my-app -> React project
```
npm install
npm run build
serve -s build -> This is needed for the integration tests to run
```
* cd results
```
sudo npm install -g live-server -> sudo can be ommited in case the command is not working.
```
* postman cli installation
```
curl -o- "https://dl-cli.pstmn.io/install/linux64.sh" | sh
```

## Run integration tests
Once all the components are running we can run the integration tests for the UI and backend.
* cd my-app
```
npm test -> There are 2998 tests, which will run for atleast 5 - 6 minutes.
```
To view the results:
* cd results
```
live-server -> This opens up a new browser window which display's a html page resultViewer.html, double click on it to see the results
The results shown are when UI sanitization is not applied.
```
* cd resultssan
```
live-server -> This opens up a new browser window which display's a html page resultViewer.html, double click on it to see the results
The results shown are when basic UI sanitization is applied.
```
### Backend test
The postman collection file CSCE665.postman_collection.json contains 3 tests, 1 should pass since it doesn't contain any prototype/HPA injection, the other 2 tests will fail.
```
postman collection run CSCE665.postman_collection.json
```
## Test UI manually by inputting malicious payloads in the form
* stop the my-app server
* Import the chrome extension and get the extension ID generated by chrome, input the extension Id in the code and reload the extension.
```
cd plugin
Modify line number 19 of the intercept.js code to add the new extension id.
```
* cd my-app
```
npm start
```
* Click on the extension that is loaded into the chrome, It will display an input field, in which you have to add the backend server URL and click on intercept button.
```
http://localhost:8080/blogposts
```
* Input the malicious payloads to view the output.

## Recording for integration tests.
```
https://drive.google.com/file/d/1xH2949L3iTlxiCn6Zqfl15QtfEpMSDVr/view?usp=share_link
```
## Recording for manually testing the UI.
```
https://drive.google.com/file/d/1g6HUL5xXBYjG8Rr1jkzI-LnKhZ1pfLSF/view?usp=share_link
```
