# C241-PS095 
This Repository contains the source code of the APIs that are being used to develop our Capstone Project 

## User API

### Get User by Id
- Method: `GET`
- Path: `/users/{userId}`
- Description: Retrieve User data based on the UserId
- Response Body:

  ```json
  {
    "status": "success",
    "data": {
        "user": {
            "userId": "<userId>",
            "username": "<username>"
        }
    }
  }
  ```