
## Description

riotgames API를 이용하여 나의 베스트 소환사 찾기

## Installation

```bash
$ npm install

## MariaDB 도커 볼륨생성
$ docker volume create lolp-mariadb-vol

## MariaDB 도커 실행
$ docker run -p 127.0.0.1:3306:3306 --name lolp-mariadb -v lolp-mariadb-vol:/var/lib/mysql -e MARIADB_ROOT_PASSWORD=dev -d mariadb:tag

## ./doc/database/mariadb-ddl.sql 적용
```

## Environment
- Riot API 발급 및 환경변수 등륵(Development API key 매일(유효기간 1day))
  - Riot_Token: RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx



## Running the app

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

## Api Doc
1. Open Swagger.json
  - http://localhost:3000/swagger-json 
  
## TypeOrm Entity
- typeorm-model-generator -h localhost -d lolp -p 3306 -u root -x dev -e mariadb


## Gganbu requirements 
  1. 우선 내가 잘하는 포지션/챔피언 and 발전 가능성 있는 포지션/챔피언을 찾아준다.