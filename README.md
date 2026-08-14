# Blog App

A fullstack Blog Application built with [Express.js][express-url], [PostgreSQL][postgresql-url] and [React][react-url].

![Main Page](./screenshots/main.png)

## Overview

This app provides 2 different frontends depending on the type of person using it. If the user is an admin, it provides access to a dashboard where you can create posts and decide whether or not they should be public at any time, and moderate comments made by other users. If not an admin, the app gives access to all the published posts and the ability to comment on them, provided you are logged in.

All of this data is stored on a [PostgreSQL][postgresql-url] database, which can be accessed by using the API endpoints. While some are available to everyone, others are protected to only registered users or even admins. 

The app uses the [CORS middleware][cors-url] to restrict access to the API from other origins except the 2 frontends and [JWT Tokens][jwt-url] to authenticate users.

### Built With

[![Express][express-shield]][express-url] &nbsp; 
[![PostgreSQL][postgresql-shield]][postgresql-url] &nbsp; 
[![Prisma][prisma-shield]][prisma-url] &nbsp; 
[![React][react-shield]][react-url] &nbsp; 
[![React Router][react-router-shield]][react-router-url] &nbsp; 
[![Vite][vite-shield]][vite-url] &nbsp; 

## Getting Started
Follow these steps to get a local copy of the project up and running.

### Prerequisites
* [NodeJs & npm][node-npm-install-guide] (Node v22.x or higher & npm v10.x or higher)
* [psql][psql-install-guide]

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/rdrg-ferreira/blog-api
    ```
2. Install packages (do it on the server, client and admin subfolders)
   ```sh
   npm install
   ```
3. (Optional) Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
4. In the server folder, create an `.env` file and add this (replace the uppercase names with your own info)
    ```text
    SESSION_SECRET=YOUR_SESSION_SECRET_KEY
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    CLIENT_FRONTEND_URL="http://localhost:5173"
    ADMIN_FRONTEND_URL="http://localhost:5174"
    ```
5. Then, on the client and admin folders create another `.env` file with this (change the port numbers here and in 4. if they differ from yours)
    ```text
    VITE_API_PROXY_TARGET='http://localhost:3000'
    ```
6. Navigate to the server directory to create a local database with the Prisma schema
    ```sh
    npx prisma db push
    ```
7. Use this to start any part of the app. You should have the API running on one process and whatever frontend you want on another
    ```sh
    npm run dev
    ```

<!-- links and images -->
[express-url]: https://expressjs.com
[postgresql-url]: https://www.postgresql.org
[node-npm-install-guide]: https://nodejs.org/en/download
[psql-install-guide]: https://www.postgresql.org/download/
[react-router-url]: https://reactrouter.com
[react-url]: https://reactjs.org/
[vite-url]: https://vite.dev
[prisma-url]: https://www.prisma.io
[cors-url]: https://expressjs.com/en/resources/middleware/cors/
[jwt-url]: https://www.jwt.io
<!-- shields -->
[express-shield]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=fff
[postgresql-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[prisma-shield]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=fff
[react-shield]: https://img.shields.io/badge/React-20232?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router-shield]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff