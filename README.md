# FreePixel

## Data Modelling

- Users
    - userId
    - name
    - email
    - password
    - points

- Image
    - title
    - description
    - category
    - location
    - date

## APIs

- /register
- /login
- /api/images
- /api/images/:_id
- /api/images/:category
- /api/images/:date

## generate JWT secret key
### terminal command:
` openssl rand -base64 16`
