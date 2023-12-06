
# Express MongoDB CRUD

The Express MongoDB CRUD project is a Node.js Express application with TypeScript, utilizing MongoDB with Mongoose for user data and order management. The application provides a set of CRUD (Create, Read, Update, Delete) operations for managing user information and orders. Data integrity is ensured through validation using Joi.


## Installation

- **Clone the project directory**

  ```bash
    git clone https://github.com/hshanto707/express-mongo-crud.git
  ```

- **Add all the dependencies**

  ```bash
    yarn install
  ```

- **.env**

  Create a .env file and add `PORT` and `DB_URL` variable.

  Sample .env file:

  ```bash
    PORT=5000
    DB_URL=mongodb+srv://<username>:<password>@cluster0.swoyo.mongodb.net/express-mongo-crud?retryWrites=true&w=majority
  ```

- **Start the application in development mode**

  ```bash
    yarn dev
  ```
## API Reference

**POST /api/users/ -** Create a new user.

  **GET /api/users/ -** Retrieve a list of all users.
  
  **GET /api/users/:userId -** Retrieve a specific user by ID.
  
  **PUT /api/users/:userId -** Update user information.
  
  **DELETE /api/users/:userId -** Delete a user by ID.

  **PUT /api/users/:userId/orders -** Create a new order

  **GET /api/users/:userId/orders -** Retrieve all the orders of a user

  **GET /api/users/:userId/orders/total-price -** Retrieve the total price of the orders of a user.


## Authors

- [@hshanto707](https://www.github.com/hshanto707)

