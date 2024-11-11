const models = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();

// Validation schema
const postSchema = {
    vtype: { type: "string", min: 1, max: 255 },
    complain: { type: "string", min: 1, max: 1000 },
    contact: { type: "string", min: 1, max: 255 },
    location: { type: "string", optional: true, max: 255 },
    problem: { type: "string", min: 1, max: 1000 },
    additional: { type: "string", optional: true, max: 1000 },
};

function save(req, res) {
    const validationResult = v.validate(req.body, postSchema);
    
    if (validationResult !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResult
        });
    }

    const post = {
        vtype: req.body.vtype,
        complain: req.body.complain,
        contact: req.body.contact,
        location: req.body.location,
        problem: req.body.problem,
        additional: req.body.additional,
    };

    models.Post.create(post)
        .then(result => {
            res.status(201).json({
                message: "Post created successfully",
                post: result
            });
        })
        .catch(error => {
            console.error("Error creating post:", error);
            res.status(500).json({
                message: "Error creating post",
                error: error.message || error
            });
        });
}

function update(req, res) {
    const id = req.params.id;
    const validationResult = v.validate(req.body, postSchema);

    if (validationResult !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResult
        });
    }

    const updatedPost = {
        vtype: req.body.vtype,
        complain: req.body.complain,
        contact: req.body.contact,
        location: req.body.location,
        problem: req.body.problem,
        additional: req.body.additional,
    };

    models.Post.update(updatedPost, { where: { id: id } })
        .then(result => {
            if (result[0] === 0) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }
            res.status(200).json({
                message: "Post updated successfully",
            });
        })
        .catch(error => {
            console.error("Error updating post:", error);
            res.status(500).json({
                message: "Something went wrong",
                error: error.message || error,
            });
        });
}

// The remaining functions do not require validation changes
function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id, {
        attributes: ['id', 'vtype', 'complain', 'contact', 'location', 'problem', 'additional', 'createdAt', 'updatedAt']
    })
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Error fetching post:", error);
            res.status(500).json({
                message: "Error fetching post",
                error: error.message || error
            });
        });
}

function index(req, res) {
    models.Post.findAll({
        attributes: ['id', 'vtype', 'complain', 'contact', 'location', 'problem', 'additional', 'createdAt', 'updatedAt']
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message || error
            });
        });
}

function destroy(req, res) {
    const id = req.params.id;

    models.Post.destroy({ where: { id: id } })
        .then(result => {
            if (result === 0) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }
            res.status(200).json({
                message: "Post deleted successfully",
            });
        })
        .catch(error => {
            console.error("Error deleting post:", error);
            res.status(500).json({
                message: "Error deleting post",
                error: error.message || error,
            });
        });
}

module.exports = {
    save,
    show,
    index,
    update,
    destroy
};