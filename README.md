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
