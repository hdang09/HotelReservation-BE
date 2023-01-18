const router = require('express').Router();
const roomRoute = require('./room.route');
const swaggerRoute = require('./swagger.route');

const routes = [
    {
        path: '/rooms',
        route: roomRoute,
    },
    {
        path: '/api-docs',
        route: swaggerRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
