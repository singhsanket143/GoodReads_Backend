## APIs

- Sign up
    localhost:3005/api/v1/signup - POST
    request object: 
    ```
    {
        username: <username>,
        email: <email>,
        password: <password>
    }
    ```
    success response object:
    ```
    {
        "message": "Successfully created the User",
        "err": {},
        "data": {
            "email": "admin@goodreads.com",
            "password": "$2b$09$7Dj93ayk6RjMoo4kPBpo1u/PXkWUiZsRx5bHghvBq4kMMHGBnB8AG",
            "username": "admin",
            "_id": "63ed224fd44770ae43d00fef",
            "__v": 0
        },
        "success": true
    }
    ```
    failure response object: 
    ```
    {
        "message": "User validation failed: email: is already taken., username: is already taken.",
        "err": [
            {
                "name": "ValidatorError",
                "message": "is already taken.",
                "properties": {
                    "message": "is already taken.",
                    "type": "unique",
                    "path": "email",
                    "value": "admin@goodreads.com"
                },
                "kind": "unique",
                "path": "email",
                "value": "admin@goodreads.com"
            },
            {
                "name": "ValidatorError",
                "message": "is already taken.",
                "properties": {
                    "message": "is already taken.",
                    "type": "unique",
                    "path": "username",
                    "value": "admin"
                },
                "kind": "unique",
                "path": "username",
                "value": "admin"
            }
        ],
        "data": {},
        "success": false
    }
    ```

- Sign up
    localhost:3005/api/v1/signin - POST
    request object: 
    ```
    {
        email: <email>,
        password: <password>
    }
    ```
    success response object:
    ```
    {
        "message": "Successfully signed in",
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmM4ZjVkMWY0YmQ2NjQxMWU2M2RjNiIsImVtYWlsIjoiYWRtaW5AZ29vZHJlYWRzLmNvbSIsImlhdCI6MTY3NzQ5NjY4OCwiZXhwIjoxNjc3NTAwMjg4fQ.s8UwpEsY_MfV7MWRRtHCjLaq2s_G7xISjt758G--cYs",
        "err": {},
        "success": true
    }
    ```
    failure response object: 
    ```
    {
        "message": "Invalid data sent from the client",
        "err": "Password given is not correct, please try again!",
        "data": {},
        "success": false
    }
    ```
    ```
    {
        "message": "Invalid data sent from the client",
        "err": "No registered user found for the given email",
        "data": {},
        "success": false
    }
    ```
