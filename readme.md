# Inventory App

A MERN stack application that business owners(retailers, wholesalers etc) can use to keep detailed track of their activities(sales, purchases) and other stuff. I built this application while strengthening my express/react/redux skills. So if you eventually decide to peruse my code, please don't gnash your teeth if you discover funny stuff. 😂

<!-- Add other stuff here later -->

## What exactly is this?

A React/Redux/Styled-components powered frontend app that sends request to and receives data from an Express/MongoDB powered Backend API.
<!-- Explain further -->

## Features

- Authentication
- CRUD functionality on various routes(auth, users, allUsers, purchases, products, customers, suppliers, sales). I'll probably add more later
- Users can update their account info(yet to implement email verification but that would be later)

<!-- Add other features -->

## Usage

- `npm install`

- Go to the `default.json` file in the `config` directory and edit your mongoURI and jwtSecret details. The latter might not be necessary. Then run `npm run dev`

## API docs

### Routes

- `/api/allUsers`: This GET route serves json of all registers users as an array of objects(when parsed). Fields include `memberSince`, `username`, `email`, `company`

- `/api/auth`: This route does two things. The GET route authenticates a logged in user(private route and requires a token) by using the token to check for the user. Thereby returning the currently logged in user. The other POST route is used for logging in a user and authenticating them. Fields required: one of of `email` or `username` and `password`.

- `/api/customers`: This has GET, POST, PUT and DEL methods. They perform CRUD functionalities for an authenticated user's customers.

- `/api/products`: This has GET, POST, PUT and DEL methods. They perform CRUD functionalities for an authenticated user's products.

- `/api/purchases`: This has GET, POST, PUT and DEL methods. They perform CRUD functionalities for an authenticated user's purchases.

- `/api/sales`: This has GET, POST, PUT and DEL methods. They perform CRUD functionalities for an authenticated user's sales.

- `/api/suppliers`: This has GET, POST, PUT and DEL methods. They perform CRUD functionalities for an authenticated user's suppliers.

- `/api/users`: This has POST, PUT and DEL methods. They respectively create users, edit users' details and delete users.

>When making requests to edit users' details, make sure they aren't allowed to send whitespace or nothing. Also do well to trim responses like username, email address and name among others.

-----------------

This is the finished version of [yarapi](https://github.com/Eronmmer/yarapi)
