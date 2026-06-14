# UrbanBasket Backend API

## Project Overview

UrbanBasket Backend is a RESTful API developed using Node.js, Express.js, and MongoDB for an e-commerce application. The backend provides user authentication, product management, and shopping cart functionality.

---

## 🔗 Links

- **GitHub:** [github.com/monikamittal-1728/UrbanBasket](https://github.com/monikamittal-1728/UrbanBasket/tree/main/NodeJS)

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv

---

## Project Structure

```
NodeJS
│
├── controllers
├── models
├── routes
├── middleware
├── .env
├── index.js
├── package.json
└── README.md
```

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Run the Application

```bash
npm start
```

or

```bash
nodemon index.js
```

---

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Registers a new user account.

### Login User

```http
POST /api/auth/login
```

Authenticates the user and returns a JWT token.

---

## Product APIs

### Get All Products

```http
GET /api/products
```

Returns a list of all products.

### Get Product By ID

```http
GET /api/products/:id
```

Returns details of a single product.

---

## Cart APIs (Protected Routes)

### Add Product to Cart

```http
POST /api/cart
```

Adds a product to the authenticated user's cart.

### Get Cart

```http
GET /api/cart
```

Returns the authenticated user's cart.

### Update Cart Item Quantity

```http
PUT /api/cart/:id
```

Updates the quantity of a cart item.

### Delete Cart Item

```http
DELETE /api/cart/:id
```

Removes a product from the cart.

---

## Security Features

* Password hashing using bcryptjs
* JWT-based authentication
* Protected cart routes
* Email validation
* Product validation
* Quantity validation

---

## Testing

All API endpoints were tested using Thunder Client.

The following API tests were performed:

* User Registration
* User Login
* Get All Products
* Get Product By ID
* Add Product to Cart
* Update Cart Item
* Delete Cart Item
* Unauthorized Access Validation

---

## Database Collections

MongoDB collections used in this project:

### Users

Stores registered user information.

### Products

Stores product information including:

* Title
* Price
* Description
* Stock Quantity

### Cart

Stores cart items with:

* User ID
* Product ID
* Quantity

---

## Author

Monika Gupta
