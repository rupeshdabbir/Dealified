# Rapchik / Dealified 
  - "Don't ever miss a deal"

[Demo] (http://rapchik.online)

## Authors:
@Rupesh Dabbir
@Sidharth Malkireddy

## Description
- Rapchik (AKA Dealified) basically lets user to search for a deal.
- Alert user based on certain "Rules"
- Emails user when the price falls below [x]
- Lets you find new deals.

## Technology stack
- MongoDB (For searching)
- ReThinkDB 
- Redis (For caching)
- RabbitMQ
- NodeJS.
- ReactJS.
- ES6 Javascript.
- Webpack / Babel for React.

## Setup

- `git clone <project>`
- `cd your-project`
- `rm -rf .git`
- `git init && git remote add origin <sshUrl>`
- `npm install`
- `cp dev.env .env`
- `npm i -g foreman` (if you don't have it globally installed already)
- `make client`

## Architecture
- I will update more info here.


## Todo

- Settings for user configuration
- Deals analytics.


## Auth0

- This project uses Auth0 as the default authentication mechanism.
- If you don't have an Auth0 account, create a new one, add the required .env vars.

Make sure in your Settings tab on Auth0's site to set callback url's to `http://localhost:8011/login` and
allowed origins to `http://localhost:8011`

