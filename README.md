## Run the app locally

1. Pull the repo to your machine:

```bash
git clone https://github.com/ajesamann/indigov-take-home.git
```

2. Install the app dependencies:

```bash
npm install
```

3. Setup your local SQLite database. You may name the initial migration whatever you want. This will generate a `dev.db` file in your `/prisma` folder. This is your local database:

```bash
npx prisma migrate dev --name init
```

4. Create a `.env` file in the app directory and add a port variable to whatever port you'd like the app to run on:

```
PORT=3000
```

5. Test to ensure the app is working by running a `curl` to create a new constituent:

```bash
curl -X POST http://localhost:<your-port>/api/constituents/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": "1234 Elm Street"
  }'
```

## Tech stack

Backend framework: **Express.js**

- Lightweight, quick and easy to setup with low overhead -- perfect for this scenario.

Database: **SQLite**

- Provided by default with Prisma and is super optimal for prototyping small-scale projects.

ORM: **Prisma**

- Seamlessly integrates with TypeScript, speeding up development and reducing boilerplate.

## Scaling Considerations

Imagine the app needs to process millions of new constituents daily. Here's what I would change or explore for a more optimal solution:

- This application would be much more write-heavy without too many relations (if any at all), so a relational database might not make sense. It might make more sense to go with a NoSQL database.

- We should implement a rate limiter to prevent abuse of specific endpoints and protect against excessive requests from a single user. You could also introdue a CAPTCHA to prevent bots.

- Perform data validation on the front-end as well to prevent unnecessary server calls.

## Thank you

Thank you for taking the time to look over my submission!
