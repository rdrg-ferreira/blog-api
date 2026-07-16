# How to use this template

#### 1. Create a new repository from this template

#### 2. Clone the repository

#### 3. Install dependencies
`npm install`

#### 4. Update your project info
Open your `package.json` and update the following fields
```json
{
  "name": "<my-repo-name>",
  "homepage": "https://github.com/rdrg-ferreira/<my-repo-name>/",
  "repository": {
      "url": "git+https://github.com/rdrg-ferreira/<my-repo-name>.git"
  },
  "bugs": {
      "url": "https://github.com/rdrg-ferreira/<my-repo-name>/issues"
  },
}
```
Follow this by doing `npm update`

#### 5. Create a .env at the root directory and add SESSION_SECRET
Use [this](https://randomkeygen.com/secret-key) website to generate a secret

#### 6. Setup your development database
Open `psql` and in it do:

```
CREATE DATABASE <db_name>;
\c <db_name>
```

Create the following env var in `.env`:
`DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"`

Replace the placeholders with your actual database credentials:

- username: Your PostgreSQL username
- password: Your PostgreSQL password
- localhost:5432: Your PostgreSQL host and port
- db_name: Your database name

Define the data model in prisma/schema.prisma by adding all the tables fields and relations I might need

When it looks good, migrate the db (updates the db tables based on the schema):

`npx prisma migrate dev --name init` (init is the name of the migration, change it for the next ones)

Then generate the Prisma Client:

`npx prisma generate`

To add a user to test without it being hardcoded add env vars `SEEDED_USER_NAME` and `SEEDED_USER_PASSWORD` with the respective username and password for the user

Use `npm run seed` to put dummy data in dev db. [Nested writes](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#nested-writes) reference

We can use `npx prisma studio --config ./prisma.config.js` to explore the db

Reference [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud) Prisma operations

Reference [Raw queries](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries) using Prisma

Reference [Migration using branches](https://www.prisma.io/docs/guides/database/data-migration)

Reference [TypedSQL](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/typedsql) (Idk if this is worth looking into)

Reference [Relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

#### 7. Deploy
When deploying, at least on Render, do:
- Create prod db
- If I want to populate the prod db from my local machine, do `DATABASE_URL="external_prod_db_url" npm run seed`
- Create web service and check this settings:
    - root dir: .
    - build command: npm run build_and_pre_deploy
    - start command: node app.js
- import env variables from .env
- Set `DATABASE_URL` on pass to prod db internal url