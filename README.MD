Nest.js Big Application Starter
========================

A big starter for Nest.js application including prepared configuration for PostgreSQL, file uploading module, CRUD controller for working with an entity and configured and prepared for work application testing module.

Database setup is done using migrations.

Besides the repository includes configured docker-compose и Dockerfile for application dockerizing.

You can use this boilerplate as a start point for your Nest.js application or as the sample of solving of some issues during the setup of the components of your Nest.js application.

## What does the starter contains? ##
-------------------------
- `Nest.js` framework includes additional modules: `@nestjs/config`, `@nestjs/jwt`, `@nestjs/swagger`, `@nestjs/typeorm`;
- `class-transformer`  и `class-validator` for incoming entities validation;
- `crypto-js` passwords encrypting;
- `dotenv` for working with .env files out of the Nest.js application;
- `luxon` for working with date and time (I don't use it in this code, but if you don't need it, you can remove it from dependencies :) );
- `nestjs-swagger-api-implicit-queries-decorator` a package for better working with query params in Swagger;
- `pg` connector for PostgreSQL;
- `swagger-ui-express` Swagger in Express.js and Nest.js apps;
- `typeorm` ORM for working with PostgreSQL;
- `uuid4` generates UUID.

### Database ###
Here I use PostgreSQL as the DBMS, but if you don't need it, you can change it.

### Testing ###
Here I use fully configured application endpoint testing sample by the `jest` and `supertest` packages with test database setup. 

After the teardown, the test database will be removed.

### Migrations ###
Tables in the database is created by the migrations. Please apply the migration before start the working.

### Endpoint documentation ###
In application there is a configuration for Swagger. After application start, please go to address `/api/docs` and enjoy it :).

### File uploading ###
There is configured settings for the `multer`. You can upload a simple png file to the suitable endpoint - read Swagger about it :).

### Dockerizing ###
There is prepared configuration for the docker-compose and Dockerfile. Just build the application image and then run it by docker-compose!

## How I can start? ##
-------------------------
In this section, I will explain how to get started with the starter and get it running.

### Run the starter without Docker ###
Before you start, make sure you have `Node.js` **v19.1.0** or newer installed. In addition, you must have `PostgreSQL` installed.

After downloading the code to your computer, create a `.env` file with the following parameters

* `PRIVATE_KEY` - secret key for JWT authentication;
* `FILE_STORAGE` - the name of the directory at the project level in which the files you uploaded will be saved;;
* `PORT` - port where your Nest.js app will run;
* `POSTGRES_HOST` - addres of your PostgreSQL server;
* `POSTGRES_PORT` - port of your PostgreSQL server;
* `POSTGRES_USER` - PostgreSQL username;
* `POSTGRES_PASSWORD` - PostgreSQL user password;
* `POSTGRES_DB` - the name of the PostgreSQL database that the application will work with;
* `PGDATA` - data storage location used by PostgreSQL (if you're on Linux, apply `/var/lib/postgresql/data/pgdata`).

After setting the environment variables, create databases in your PostgreSQL with the names specified in the `.env` files in the `POSTGRES_DB` key.

Next, after creating the databases, run the following commands:

```sh
# Install dependencies
$ npm i

# Build an application
$ npm run build

# Run tests (not necessary)
$ npm run test

# Apply migrations
$ npm run migration:run

# Start this application
$ npm run start
```
After a successful start, go to the address of your application along the path `/api/docs` and try!

### Run the starter with Docker ###
In order to run the application in Docker, you need to repeat the process of creating the `.env` file from the previous paragraph, and then build the application image.

The built image is run using docker-compose.

Run the following commands:

```sh
# Build an application image
$ docker build -t nest-application-starter .

# Run compose
$ docker-compose up
```

After a successful start, go to the address of your application along the path `/api/docs` and try!

## Oops, I have some errors in the console :( ##
After running the application in Docker, there may be errors on first run related to permission issues in the `nest_application_starter_pgadmin` container files.

This is done with the following commands:

```sh
$ docker exec -it -u root nest_application_starter_pgadmin sh

$ chown -R pgadmin:pgadmin /var/lib/pgadmin

$ exit
```

### Applying the migrations ###
I have not found another way to apply migrations to the database at the moment. I share what I have, it works.

```sh
$ docker exec -it -u node nest-application-starter sh

$ cd /app

$ npm run migration:run

$ exit
```

If there are ways to run migrations while deploying docker-compose, please share.

## License ##
-------------------------
<a href="https://github.com/d-indifference/nest-application-starter/blob/master/LICENSE">MIT License</a>
