# C241-PS095 
This Repository contains the source code of the APIs that are being used to develop our Capstone Project <br>

## Header 
key   : Authorization <br>
value : (token)

## User

### Create User
- Method: `POST`
- Path: `/users`
- Description: Create a new user with the provided username, email, and password.
- Request Body:

  ```json
  {
      "username": "<username>",
      "email": "<email>",
      "password": "<password>"
  }
  ```

- Response Body:
  
  ```json
  {
    "status": "success",
    "message": "User created successfully",
    "data": {
        "id": "<id>",
        "username": "<username>",
        "email": "<email>",
        "createdAt": "<createdAt>"
      }
  }
  ```

### Get All Users
- Method: GET
- Path: `/users`
- Description: Retrieve all users data.
- Response Body:

  ```json
  {
    "status": "success",
    "message": "Users retrieved successfully",
    "data": [
        {
            "id": "<id>",
            "username": "<username>",
            "email": "<email>",
            "createdAt": "<createdAt>"
        },
        {
            "id": "<id>",
            "username": "<username>",
            "email": "<email>",
            "createdAt": "<createdAt>"
        },
        ...
    ]
  }
  ```

### Get User by Id
- Method: GET
- Path: `users/{id}`
- Description: Retrieve user data based on the id (require token in the header).
- Response Body:

  ```json
  {
    "status": "success",
    "message": "User retrieved successfully",
    "data": {
        "id": "<id>",
        "username": "<username>",
        "email": "<email>",
        "createdAt": "<createdAt>"
    }
  }
  ```

### Update Username
- Method: PATCH
- Path: `/users/username/{id}`
- Description: Update username based on the id (require token in the header).
- Request Body:
  
  ```json
  {
    "newUsername": "<newUsername>"
  }
  ```

- Response Body:

  ```json
  {
    "status": "success",
    "message": "Username updated successfully"
  }
  ```

### Update Email
- Method: PATCH
- Path: `/users/email/{id}`
- Description: Update user email based on the id (require token in the header).
- Request Body:
  
  ```json
  {
    "newEmail": "<newEmail>"
  }
  ```

- Response Body:

  ```json
  {
    "status": "success",
    "message": "Email updated successfully"
  }
  ```

### Update Password
- Method: PATCH
- Path: `/users/password/{id}`
- Description: Update user password based on the id (require token in the header).
- Request Body:
  
  ```json
  {
    "newPassword": "<newPassword>"
  }
  ```

- Response Body:

  ```json
  {
    "status": "success",
    "message": "User password updated successfully"
  }
  ```

### Delete User
- Method: DELETE
- Path: `/users/{id}`
- Description: Delete user from database based on the id (require token in the header).
- Response Body:

  ```json
  {
    "status": "success",
    "message": "User deleted successfully"
  }
  ``` 
  <br>


## Authentication

### Login
- Method: POST
- Path: `auth/login`
- Description: Authenticate the email and password provided by the User.
- Request Body:

  ```json
  {
    "email": "<email>",
    "password": "<password>"
  }
  ```

  - Response Body:

  ```json
  {
    "status": "success",
    "message": "User logged in successfully",
    "token": "<token>"
  }
  ```

### Logout
- Method: POST
- Path: `auth/logout`
- Description: Sign out the User from the application (require token in the header).
- Response Body:

  ```json
  {
    "status": "success",
    "message": "User logged out successfully"
  }
  ```