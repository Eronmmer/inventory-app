# This is the API I built for an app I wanna build with React.

## Features

> Please keep in mind that this project is a work in progress

- Authentication
- CRUD functionality on various routes(auth, users, allUsers, purchases, products, customers, suppliers, sales). I"ll probably add more later
- Users can update their account info(yet to implement email verification but that would be later)


This is basically an inventory app that business owners can use to keep detailed track of their activities and other stuff. The frontend app(which I"m lazy to start working on) will do a better job at helping you understand what the idea is. Stay tuned. 

Incase you manage to go through the code and find one or two things that can be corrected, do well to make a PR 

## Steps. PS: I wrote these below for myself not you 😈. Peruse at your own peril.

- Start server
- Create routes
- Begin with users(You wanna be able to create users before you begin anything yeah? So, start with registering a user first)
- Create auth(two routes. 1. Get logged in user 2. Log user in and get token)
- Create dummy endpoints for your other routes and test with postman
- To use express validator, do the following:

```js
const {check, validationResult} = require('express-validator/check')

// Then as a second parameter in brackets, add your check.
app.post('/user', [
  // username must be an email
  check('username').isEmail(),
  // password must be at least 5 char long
  check('password').isLength({min: 5})
], async (req, res, next) => {
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }

  const {username, password} = req.body
  try {
    const newUser = new User({
      username, password
    })
    await newUser.save()
    res.json({msg: "User successfully created"})
  } catch(err) {
    console.log(err)
    res.status(500).send("Server Error")
  }
})
```

- Test that a user can now be created and saved to the database.
- Now hash password(if necessary obviously) with bcrypt or some other package. First generate a salt then hash password like so:

```js
const salt = await bcrypt.genSalt(10)

user.password = await bcrypt.hash(password, salt)
```

- Send a jsonwebtoken when user has been successfully created. This will be used to keep a user logged in and access protected routes. Tokens will also be sent when a user logs in.

- Go to auth and enable logging in and making it possible to do GET requests whenever a protected route is hit. Validate email or username and password, check if details sent match with what's in the database, then sign with jwt to receive a token.

- Now that you can get tokens on logging in and registering, create middlewares that will use will validate these tokens whenever a protected route is hit. This middleware  will check if there is a valid token in the request header. If there's one, the user id will be exposed. This id will now be used to perform private operations.

- create GET, POST, PUT and delete methods to your different private routes


E go be ✌✌
