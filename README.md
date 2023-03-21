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
        "data": {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmM4ZjVkMWY0YmQ2NjQxMWU2M2RjNiIsImVtYWlsIjoiYWRtaW5AZ29vZHJlYWRzLmNvbSIsImlhdCI6MTY3NzQ5NjY4OCwiZXhwIjoxNjc3NTAwMjg4fQ.s8UwpEsY_MfV7MWRRtHCjLaq2s_G7xISjt758G--cYs",
            username: <username>
        },
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

- Create Books:  localhost:3005/api/v1/books - POST 


    -   request object:
    ```
    {
        "title": "ABC1",
        "description": "Something",
        "author": "64063c7abf4bacf0fc6ede00",
        "genres": ["6409fe4709fc38c7d4f77d7c", "640a0120da282a962a095b0d"],
        "pages": 500,
        "publishDate": "January 1, 2011"
    }
    ```
    - success response object
    ```
    {
        "message": "Successfully created the Book",
        "err": {},
        "data": {
            "title": "ABC1",
            "description": "Something",
            "author": "64063c7abf4bacf0fc6ede00",
            "genres": [
                "6409fe4709fc38c7d4f77d7c",
                "640a0120da282a962a095b0d"
            ],
            "pages": 500,
            "publishDate": "January 1, 2011",
            "rating": 0,
            "_id": "640a0280d6280c9ca58aef41",
            "createdAt": "2023-03-09T16:00:00.035Z",
            "updatedAt": "2023-03-09T16:00:00.035Z",
            "__v": 0
        },
        "success": true
    }
    ```

- Get all Books:  localhost:3005/api/v1/books - GET
    - Success response object
    ```
    {
        "message": "Successfully fetched all the Books",
        "err": {},
        "data": [
            {
                "_id": "640a0280d6280c9ca58aef41",
                "title": "ABC1",
                "description": "Something",
                "author": "64063c7abf4bacf0fc6ede00",
                "genres": [
                    "6409fe4709fc38c7d4f77d7c",
                    "640a0120da282a962a095b0d"
                ],
                "pages": 500,
                "publishDate": "January 1, 2011",
                "rating": 0,
                "createdAt": "2023-03-09T16:00:00.035Z",
                "updatedAt": "2023-03-09T16:00:00.035Z",
                "__v": 0
            }
        ],
        "success": true
    }
    ```

- Get Book by id:  localhost:3005/api/v1/books/:id - GET
    - Success resposne object
    ```
    {
        "message": "Successfully fetched the Book",
        "err": {},
        "data": {
            "_id": "640a0280d6280c9ca58aef41",
            "title": "ABC1",
            "description": "Something",
            "author": "64063c7abf4bacf0fc6ede00",
            "genres": [
                "6409fe4709fc38c7d4f77d7c",
                "640a0120da282a962a095b0d"
            ],
            "pages": 500,
            "publishDate": "January 1, 2011",
            "rating": 0,
            "createdAt": "2023-03-09T16:00:00.035Z",
            "updatedAt": "2023-03-09T16:00:00.035Z",
            "__v": 0
        },
        "success": true
    }
    ```
    - error response object - 404
    ```
    {
        "message": "Invalid data sent from the client",
        "err": "No book found for the given id",
        "data": {},
        "success": false
    }
    ```
    - error resposne object - 400
    ```
    {
        "message": "Something went wrong",
        "err": {
            "explanation": "Invalid book id present in the request"
        },
        "data": {},
        "success": false
    }
    ```

- Rate a book 

    localhost:3005/api/v1/books/:id/rate/:rating - Patch
    - Success response
    ```
    {
        "message": "Successfully rated the Book",
        "err": {},
        "data": 2,
        "success": true
    }
    ```

- Create a new book shelf

    localhost:3005/api/v1/bookshelves - POST - AUTH
    - request object:
    ```
    {
        name: 'my readings'
    }
    ```
    - Success response
    ```
    {
        "message": "Successfully created the BookShelf",
        "err": {},
        "data": {
            "userId": "640f2d8f4ecc33392931f0a6",
            "name": "my readings",
            "books": [],
            "_id": "640f30d3fc393542e9d2d3d1",
            "createdAt": "2023-03-13T14:18:59.060Z",
            "updatedAt": "2023-03-13T14:18:59.060Z",
            "__v": 0
        },
        "success": true
    }
    ```

- Get all shelves of a user
    localhost:3005/api/v1/bookshelves - GET - AUTH
    - response object:
    ```
    {
        "message": "Successfully fetched the BookShelves for the user",
        "err": {},
        "data": [
            {
                "_id": "640f2d8f4ecc33392931f0ab",
                "userId": "640f2d8f4ecc33392931f0a6",
                "name": "read",
                "books": [],
                "__v": 0,
                "createdAt": "2023-03-13T14:05:03.113Z",
                "updatedAt": "2023-03-13T14:05:03.113Z"
            },
            {
                "_id": "640f2d8f4ecc33392931f0ac",
                "userId": "640f2d8f4ecc33392931f0a6",
                "name": "currently_reading",
                "books": [],
                "__v": 0,
                "createdAt": "2023-03-13T14:05:03.113Z",
                "updatedAt": "2023-03-13T14:05:03.113Z"
            },
            {
                "_id": "640f2d8f4ecc33392931f0ad",
                "userId": "640f2d8f4ecc33392931f0a6",
                "name": "want_to_read",
                "books": [],
                "__v": 0,
                "createdAt": "2023-03-13T14:05:03.113Z",
                "updatedAt": "2023-03-13T14:05:03.113Z"
            },
            {
                "_id": "640f30d3fc393542e9d2d3d1",
                "userId": "640f2d8f4ecc33392931f0a6",
                "name": "my readings",
                "books": [],
                "createdAt": "2023-03-13T14:18:59.060Z",
                "updatedAt": "2023-03-13T14:18:59.060Z",
                "__v": 0
            }
        ],
        "success": true
    }
    ```
- Add book to a user's shelf 

    localhost:3005/api/v1/bookshelves/:bookid/add/:shelf - PATCH - AUTH
    - Success response object
    ```
    {
        "message": "Successfully added book to the BookShelf for the user",
        "err": {},
        "data": {
            "_id": "640f2d8f4ecc33392931f0ad",
            "userId": "640f2d8f4ecc33392931f0a6",
            "name": "want_to_read",
            "books": [
                "640f2630fce985aa9bf4cdc1"
            ],
            "__v": 3,
            "createdAt": "2023-03-13T14:05:03.113Z",
            "updatedAt": "2023-03-13T15:40:12.491Z"
        },
        "success": true
    }
    ```
    - error response object
    ```
    {
        "message": "Book already in the shelf",
        "err": "Book id already present in the user shelf provided",
        "data": {},
        "success": false
    }
    ```

- Get all books from a shelf
    localhost:3005/api/v1/bookshelves/sarthakshelf
    - Success response 
    ```
    {
        "message": "Successfully fetched books from the BookShelf for the user",
        "err": {},
        "data": {
            "_id": "6419a47df411999cb4853fa8",
            "userId": "640f2d8f4ecc33392931f0a6",
            "name": "sarthakshelf",
            "books": [],
            "createdAt": "2023-03-21T12:35:09.992Z",
            "updatedAt": "2023-03-21T12:35:09.992Z",
            "__v": 0
        },
        "success": true
    }
    ```