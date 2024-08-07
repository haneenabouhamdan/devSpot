# Devspot

Devspot is a comprehensive platform for developers to connect, learn, collaborate, and grow within the global developer community.

## Description

[Nest](https://github.com/nestjs/nest) is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm).
- You have installed [PostgreSQL](https://www.postgresql.org/download/). Follow the [PostgreSQL setup guide](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/).
- You have installed [Redis](https://redis.io/download). Follow the [Redis setup guide](https://redis.io/topics/quickstart).

## Installation

Clone the repository:

```bash
$ git clone https://github.com/haneenabouhamdan/devSpot.git
```

Install the dependencies:

```bash
$ npm install
```

Create Database named dev_spot and run migrations:

```bash
$ npm run m:run
```

## Running the app

Make sure to run postgres and redis before starting the app.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


### .env variables

# server configurations
PORT= 8080
HOST=localhost
NODE_ENV=development
APP_BASE_URL=http://localhost
#POSTGRES
POSTGRES_VERSION=15.4
POSTGRES_USER_NAME=postgres
POSTGRES_PASSWORD=
POSTGRES_HOST=localhost
# POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DATABASE_NAME=dev_spot
#jwt
JWT_SECRET=
JWT_EXPIRATION=
#redis
REDIS_HOST=localhost
# REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_TTL=
REDIS_PREFIX=dev_spot
#super user
SUPER_USER_EMAIL=
SUPER_USER_PHONE=
SUPER_USER_PASSWORD=

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).


