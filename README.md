# Default DOCKER Progect

Configure docker to up container.

## Getting Started

These instructions will cover usage information and for the docker container

### Prerequisities

In order to run this container you'll need docker installed.

- [Windows](https://docs.docker.com/windows/started)
- [OS X](https://docs.docker.com/mac/started/)
- [Linux](https://docs.docker.com/linux/started/)

### Make migrations

```text
php bin/console make:migration
```

```text
php bin/console doctrine:migrations:migrate
```

### Configure file `hosts` to start container in local domain

```text
# local domains for production and development
127.0.0.1 practic22.com
# etc...
```

### Usage (Scripts)

Stop, delete all containers and recreate this in `development` version

```shell
./dev_recreate_docker.sh
```

Stop, delete all containers and recreate this in `local` version

```shell
./local_recreate_docker.sh
```

### Usage (Detailed)

Build container in `development` version in the background

```shell
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build -d
```

Build container in `local` version in the background

```shell
docker-compose -f docker-compose.yaml -f docker-compose.local.yaml up --build -d
```

#### Symfony .env.local configuration

Database configuration

```text
DATABASE_URL=mysql://practic22-user:q123123123@172.22.0.8:3306/practic22?serverVersion=5.7
```

#### Show logs

For FRONTEND container use (todo):

```text
docker-compose logs -f --tail 50 frontend
```

For API container use:

```text
docker-compose logs -f --tail 50 api
```

For NGINX container use:

```text
docker-compose logs -f --tail 50 nginx
```

#### In browser

Access from browser

- [Backend](https://practic22.com/api)
- [Frontend](https://practic22.com)
- [PhpMyAdmin](http://practic22.com:8080)
