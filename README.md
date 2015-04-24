# Clavy [![](https://travis-ci.org/atomiomi/clavy.svg?branch=master)](https://travis-ci.org/atomiomi/clavy/builds)

Clavy is a handy task manager that helps you to reach goals. The name was got from 'clever' word. That means it is intelligent and can help to accomplish various tasks. Our idea is to make universal assistant which will plan your day. All that you need to do is just define deadlines and precedence of each task. Afterwards, our system evenly disperses all tasks between current day and its deadlines. If it's necessary you can drag tasks on day that is more convenient to you.

We know that some major goals can't be reached without help. So it will be useful if it is possible to share tasks with friend or colleagues. In Clavy just select particular task and send it to another user, you will be notified about his answer(accept/refuse).

### Run Project
To run Clavy on your local machine some softwares need to be installed. Below there is list of them with  corresponding link for installation tutorials:
* At the moment Mongodb database is used on the project. You can easily install it by this [tutorial](http://docs.mongodb.org/manual/installation/). 
* For server-side environment we use Node.js. There is a pretty good [article](https://docs.npmjs.com/getting-started/installing-node) where its installation is described.
* Eventually package management. Since the project uses Node.js environment it's naturally to use npm. It must be already installed with Node.js.

Afterwards all dependencies are installed you can follow this steps to run the project:
* Clone the project to a some folder on your system. The link can be got from the [GitHub repository](https://github.com/atomiomi/clavy).
* All commands are performed in a project folder, so open terminal and go to it.
* At first npm packages must be installed. Just type: `npm install`.
* Gulp should be installed globally: `npm install gulp -g`.
* Due to bundle files aren't kept in repo they must be compiled. To do this run production task: `npm run production`.
* Run the server: `npm run start`. Now Clavy is available on `localhost:8080`.

### License
MIT © Clavy project
