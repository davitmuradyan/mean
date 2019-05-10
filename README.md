# mean

To install the project you need to have `node.js` and `mongodb` installed on your computer.
Run the following commands in the root of your project.
```sh
$ npm i -g lerna
$ npm install
$ lerna bootstrap
```
Go to `env` and create `.env` file,
copy the content from `.env.example` and fill your credentials there.
When everything finished, run: 
```sh
$ npm run dev:all
```
and open your browser `http://localhost:4200`
