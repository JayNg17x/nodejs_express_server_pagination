const db = require('../models');
const Tutorial = db.tutorials;
const Operation = db.Sequelize.Operation;

// CONTROLLER WITH PAGINATION
const getPagination = (page, size) => {
    let limit = size ? +size : 3;
    let offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    let { count: totalItems, rows: tutorials } = data;
    let currentPage = page ? page : 0;
    let totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

// PERFORM ANOTHER OPERATION ON DB QUERY

// create and save new tutorial
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Invalid request.'
        })
    }

    // create tutorial
    let tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
    };

    // save created tutorials in db
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some errors occured while creating data :('
            })
        });
};

// retrieve all tutorials from database
exports.findAll = (req, res) => {
    let { page, size, title } = req.query;
    let condition = title ? {
        title: {
            [Operation.like]: `${title}`
        }
    } : null;
    let { limit, offset } = getPagination(page, size);

    Tutorial.findAndCountAll({ where: condition, limit, offset })
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send({
                message: err.message || 'Some errors occured while retrieving data :('
            })
        });
};

// update tutorial by id in the request
exports.update = (req, res) => {
    // get specified id
    let id = req.params.id;

    Tutorial.update(req.body, { where: id })
        .then(result => {
            if (result === 1) {
                res.send({
                    message: 'Data was updated successfully!'
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some errors occured while updating data :('
            })
        });
};

// remove tutorial with specified id in the request
exports.remove = (req, res) => {
    // get specified id 
    let id = req.params.id;

    Tutorial.destroy(req.body, { where: id })
        .then(result => {
            if (result === 1) {
                res.send({
                    message: 'Data was removed successfully!'
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some errors occured while removing data :('
            })
        });
};

// remove all tutorials from database
exports.removeAll = (req, res) => {
    Tutorial.destroy({ where: {}, truncate: false })
        .then(result => {
            res.send({
                message: `${result} was removed successfully!`
            })
        }).catch(err => {
            res.status(400).send({
                message: err.message || 'Some errors occured while removing data :('
            })
        })
};

// find all of published tutorials 
exports.findAllPublished = (req, res) => {
    let { page, size } = req.query;
    let { limit, offset } = getPagination(page, size);

    Tutorial.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            let result = getPagingData(data, page, limit);
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some errors occured while finding data :('
            })
        });
};