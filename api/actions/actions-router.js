// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const router = express.Router();

// [GET] /api/actions
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ message: "Failed to get actions" });
    }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to get action" });
    }
});

// [POST] /api/actions
router.post('/', async (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const project = await Projects.get(project_id);
        if (project) {
            const newAction = await Actions.insert(req.body);
            res.status(201).json(newAction);
        } else {
            res.status(400).json({ message: "Invalid project ID" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to create action" });
    }
});

// [PUT] /api/actions/:id
router.put('/:id', async (req, res) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        if (updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update action" });
    }
});

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to delete action" });
    }
});

module.exports = router;
