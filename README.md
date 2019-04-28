# mean

To install the project you need to have `node.js` and `mongodb` installed on your computer.
Run the following commands in the root of your project.
```sh
$ npm i -g lerna
$ npm install
$ lerna bootstrap
```
Go to `packages/server/constants` and create `dev.credentials.js` file,
copy the content from `prod.credentials.js` and fill your credentials there,
in order to be able to send mails from the application.
When everything finished, run: 
```sh
$ npm run dev:all
```
and open your browser `http://localhost:4200`
