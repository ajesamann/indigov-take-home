## Run the app locally

Ensure you have the latest versions of Node.js and npm installed on your machine.

1. Pull the repo to your machine:

```bash
git clone https://github.com/ajesamann/indigov-take-home.git
```

2. Install the app dependencies and setup the SQLite database (this is a script in package.json):

```bash
npm run setup
```

3. Create a `.env` file in the app directory and add a port variable to whatever port you'd like the app to run on:

```
PORT=3000
```

4. Start the app locally:

```
npm run dev
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

\*If you see any type errors from `@prisma/client` where model types are imported -- restart your IDE, it should fix the problem!

## REST Endpoints

GET `/api/constituents` - Return all the constituents that have been created in the database.<br>
POST `/api/constituents/add` - Create a new constituent.<br>
GET `/api/constituents/export?before=<date>&after=<date>` - Export constituents to a CSV file, optionally filtered by dates.<br>
GET `/api/constituents/search?name__contains=<name>` - Returns all constituents whose names contain the provided value.

## Tech stack

Backend framework: **Express.js**

- Lightweight, quick and easy to setup with low overhead -- perfect for this scenario.

Database: **SQLite**

- Provided by default with Prisma and is super optimal for prototyping small-scale projects.

ORM: **Prisma**

- Seamlessly integrates with TypeScript, speeding up development and reducing boilerplate.

## Scaling Considerations

Imagine the app needs to process millions of new constituents daily. Here's a few things I would change or explore for a more optimal solution:

- This application would be much more write-heavy without too many relations (if any at all), so a relational database might not make sense. It might make more sense to go with a NoSQL database.

- Implement a rate limiter to prevent abuse of specific endpoints and protect against excessive requests from a single user. You could also introdue a CAPTCHA to prevent bots.

- Perform data validation on the front-end as well to prevent unnecessary server calls.

- Implement pagination for any endpoints that return large datasets. Returning millions of records at once over the network is extremely inefficient and can cause a multitude of performance issues. The front-end would also struggle to render such a large volume of data, potentially causing the app to crash.

- Implement a logging system to ensure any issues are caught promptly.

- Add unit tests!

## Thank you

Thank you for taking the time to look over my submission!
