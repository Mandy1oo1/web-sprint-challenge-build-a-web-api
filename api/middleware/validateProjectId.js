const Projects = require('../projects/projects-model');

async function validateProjectId(req, res, next) {
    const { id } = req.params;
    const project = await Projects.get(id);
    if (project) {
        req.project = project;
        next();
    } else {
        res.status(404).json({ message: "Project not found" });
    }
}

module.exports = validateProjectId;
