# C241-PS095 
This Repository contains the source code of the APIs that are being used to develop our Capstone Project 

## User API

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
- Description: Retrieve user data based on the id.
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

### Update User
- Method: PUT
- Path: `/users/{id}`
- Description: Update user data based on the id.
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
    "message": "User updated successfully",
    "data": {
        "id": "<id>",
        "username": "<username>",
        "email": "<email>",
        "createdAt": "<createdAt>"
    }
  }
  ```

### Delete User
- Method: DELETE
- Path: `/users/{id}`
- Description: Delete user data based on the id.
- Response Body:

  ```json
  {
    "status": "success",
    "message": "User deleted successfully"
  }
  ```