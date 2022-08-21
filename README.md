# Web Application For CV Database Management

These instructions will cover usage information and for the docker container

During the industrial practice, a product was designed, which is a software application for working with resumes, to assimilate the acquired knowledge.

The PHP framework Symfony, React, MySQL database will be used to create the software application.

<img src="https://i.imgur.com/RsIiWHr.png" alt="main-page" width="900">


## Getting Started

In order to run this container you'll need docker installed.

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

Stop, delete all containers and recreate this in `local` version

```shell
./local_recreate_docker.sh
```

#### Symfony .env.local configuration

Database configuration

```text
DATABASE_URL=mysql://practic22-user:q123123123@172.22.0.8:3306/practic22?serverVersion=5.7
```
Access from browser

- [Backend](https://practic22.com/api)
- [Frontend](https://practic22.com)
- [PhpMyAdmin](http://practic22.com:8080)

## Project Preview

**<p>Main page</p>**
The main page of the application contains a list of all available companies to which the authorized user can submit their resumes. 
<img src="https://i.imgur.com/4j0CnZg.png" alt="main-page" width="700">

**<p>User profile</p>**
In the user's account, it is possible to view one's own complete information, randomized profile photo, name, identification number, mailbox, mobile phone number. 
<img src="https://i.imgur.com/moQxUY6.png" alt="user-profile" width="700">

**<p>Login to the system</p>**
The application uses JWT to verify user authentication.
If the user has forgotten the password, he can send a request to change it by entering his own mailbox. 
Next, the system will check the availability of this address in the system and send a key for installation to the mail. 
This key can only be used once.
<img src="https://i.imgur.com/7HON81V.png" alt="login" width="700">

**<p>Administrative menu</p>**
First, all created records with selected fields and pagination (two records per page) appear in front of the user.
Next, the administrator can delete, change, view detailed information about an existing item or create a new one. 
The company page displays all submitted resumes to a specific company.
<img src="https://i.imgur.com/oQagVV3.png" alt="administrative-menu" width="700">

**<p>Resume</p>**
<img src="https://i.imgur.com/vw74QMW.png" alt="resume" width="700">
