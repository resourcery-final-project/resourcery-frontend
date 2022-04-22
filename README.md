# Resourcery

Resourcery is an App that enables people to support others directly with free resources on a personal level.
Users are able to post anything from free food, pet supplies, camping supplies to services for those in need.
Built with ReactJS, CSS, PostgreSQL and Express.

# Members:

Zachary Caldwell - Portland, OR
Bailey Kuebelbeck - Portland, OR
Spencer Eagleton - Vancouver, WA

# Backend Deployed on Heroku

## Resource Table

| ID     | UserID | latitude | longitude | type | description | image | address |
| ------ | ------ | -------- | --------- | ---- | ----------- | ----- | ------- |
| bigint | bigint | dec      | dec       | text | text        | text  | text    |

## User Table

| ID     | username | #passwordhash |
| ------ | -------- | ------------- |
| bigint | bigint   | int           |
