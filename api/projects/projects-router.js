// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const validateProjectId = require('../middleware/validateProjectId');

// [GET] /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Failed to get projects" });
    }
});

// [GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// [POST] /api/projects
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: "Failed to create project" });
    }
});

// [PUT] /api/projects/:id
router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update project" });
    }
});

// [DELETE] /api/projects/:id
router.delete('/:id', async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to delete project" });
    }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            const actions = await Projects.getProjectActions(req.params.id);
            res.status(200).json(actions);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to get actions" });
    }
});

module.exports = router;
