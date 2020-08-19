module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller');
    let router = require('express').Router();

    router.get('/', tutorials.findAll);

    router.get('/publised', tutorials.findAllPublished);

    app.use('/api/tutorials', router);
};