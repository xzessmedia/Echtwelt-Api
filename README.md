# echtwelt-api

To discuss and get help please join this Discord (Please don't use issue tracker for discussion) https://discord.gg/KmPZy9f

## Requirements
- NodeJS

## Installation Steps
- Run `npm install` in root directory
- Edit /src/datasources/mysql-data.datasource.json and setup your database
- Create the database on your databaseserver i.e. `echtweltapi`
- Run `npm prestart` in root directory to create build scripts
- Run `npm run migrate` in root directory to create tables
- Finally run `npm start` in root directory again to start the dev server

## Run Development Server
- Run `npm start` in root directory then open `localhost:3000` in your browser

## Deploy for Production
- Run `npm run build` in root directory
- Copy content of `dist` directory to a folder on your server (no www-dir!)
- Use a processmanager, i recommend `pm2` -> `npm install -g pm2`
- Start your server either `node .` in the deployed folder or if you use pm2 `pm2 start index.js --name "echtweltapi"`

## Docker
If you want to use docker for deployment run `npm run docker:build` and then `npm run docker:run`

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
