<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description
Orders Api

## Features

- Desing Patterns
- Interceptors and loggin
- Swwager
- github actions integration
- Jobs
- ConfigModule Valid required env

## Project setup

Clone the project and follow the next steps:

```bash
$ npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file or .env.prod if you want to build production image

`PORT`

`DEFAULT_LIMIT`

`DB_PASSWORD`

`DB_NAME`

`DB_HOST`

`DB_USER`

`DB_PORT`

`DB_SYNC`

`CACHE_PORT`

`CACHE_HOST`

`CACHE_TTL`

## Start PostgresDb and redis server

```bash
# development
$ docker compose up -d

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

```

