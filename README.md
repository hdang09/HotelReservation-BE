# Hotel Reservation API

## Description

This is an API for reserving the rooms for Mint Hotel by the receptionist.

Here is [the Frontend](https://github.com/hdang09/HotelReservation-FE).

Here is [the website](http://hotel.hdang09.site/).

## Technology

-   Frontend
    -   React Vite - Next Generation Frontend Tooling
    -   Tailwind - Rapidly build modern websites without ever leaving your HTML
-   Backend
    -   Express - Server Core
    -   Mongoose + Mongo - Database

## Team Members

-   Trần Hải Đăng (Front-end, Back-end, UI/UX Designer)

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api-docs` in your browser. This documentation page is automatically generated using the [Swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Room routes**\
`GET /rooms/` - Get all rooms\
`POST /rooms/specific` - Get specific room\
`POST /rooms/` - Reserve a room\
`PUT /rooms/update` - Edit a room information\
`PUT /update-status` - Update status a room\
`DELETE /rooms/delete` - Delete a room\

**Room report routes**\
`GET /rooms/report` - Get report\
`GET /rooms/report-today` - Get all room for today's availability\

## Guide

You can run this backend by create `.env` file with the content exactly like `.env.example` file then use command

```
yarn start
```

**Note:** if you want to deploy then replace `[YOUR_DATABASE_URL]` with your database URL.

# License & copyright

© Trần Hải Đăng, FPT University HCMC
Licensed under the [MIT LICENSE](LICENSE).
