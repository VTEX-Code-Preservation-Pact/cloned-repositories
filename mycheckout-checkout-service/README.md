# Checkoutless Backend
BackEnd Checkoutless project on [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Requirements

- [Nodejs](https://nodejs.org/) v14 or higher

## Installation and configuration

1. First clone this repository and cd into it:
   ```bash
	$ git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/checkoutless-backend
	$ cd checkoutless-backend
   ```
   
2. Config the secrets and environment values:

	We have to config all the values we need to run the application for `production` or `development` environments.
	
	2.1. Edit the configuration file for your application `.env.development` or `.env.production` file.  It would contain the variables of the MongoDB database and other services, but not the secrets.
	
	2.2. Create the secrets files for your application, depends on the environment. Then edit the secrets files (`credentials.json`, `db.pwd` or `db.crt`. The latter for MongoDB [X.509 certificates](https://docs.mongodb.com/manual/core/security-x.509/)  for passwordless authentication):
	```bash
	# development environment secrets
	$ cp secrets/development/credential.json.example secrets/development/credential.json
	$ cp secrets/development/db.pwd.example secrets/development/db.pwd
   
	# production environment secrets
	$ cp secrets/production/credential.json.example secrets/production/credential.json
	# for password
	$ cp secrets/production/db.pwd.example secrets/production/db.pwd
	# for passwordless 
	$ cp secrets/production/db.crt.example secrets/production/db.crt
	```
	
## Running with docker

1. If you have [Docker](https://www.docker.com/) already installed on your machine, go to step 2.
	
	For installing docker in UNIX systems please make:
	```bash
	$ bash docker/deployment/install-docker.sh
	```

	For installing docker in windows systems please follow the instructions: https://docs.docker.com/docker-for-windows/install/

2.  Running
	```bash
	# develompent environment (It has a MongoDB container)
	$ docker-compose -f docker/docker-compose.dev.yml up -d

	# production environment
	$ docker-compose -f docker/docker-compose.yml up -d
	```

## Running without docker

1. Install the dependencies.
   ```bash
   $ npm install
   ```

2. Launch local web server.
   ```bash
	# development mode
	$ npm run start

	# watch mode
	$ npm run start:dev

	# production mode
	$ npm run start:prod
   ```

## Try out
Navigate to [http://localhost:3333](http://localhost:3333)

## Ngrok expose
Expose your application to the wider internet using [ngrok](https://ngrok.com/download). You can click [here](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html) for more details. This step important to connect with [vtex io](https://vtex.io/).

```bash
ngrok http 3333
```
When ngrok starts up, it will assign a unique URL to your tunnel. It might be something like `https://asdf456.ngrok.io`. Take note of this and paste in the manifest.json of the vtex project.

For installing docker in windows systems please follow the instructions in:
https://docs.docker.com/docker-for-windows/install/

## Tests
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

It Globers

## Stay in touch

- Author- [Ismael Calle](ismael.calle@itglobers.com)