const router = require('express').Router();
const Projects = require('./projects-model');
const md = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      next({
        message: 'We ran into an error retrieving the projects',
      });
    });
});

router.get('/:id', md.checkProjectId, (req, res, next) => {
  res.json(req.project)
});

router.get('/:id/actions', md.checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      next({
        message: 'We ran into an error retrieving the project actions',
      });
    });
});

router.post('/', md.checkProjectCreatePayload, (req, res, next) => {
  Projects.insert(req.body)
    .then(inserted => {
      res.status(201).json(inserted);
    })
    .catch(error => {
      next({
        message: 'We ran into an error creating the project',
      });
    });
});

router.put('/:id', md.checkProjectUpdatePayload, md.checkProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        next({ status: 404, message: 'Project not found' });
      }
    })
    .catch(error => {
      next({
        message: 'We ran into an error updating the project',
      });
    });
});

router.delete('/:id', md.checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(count => {
      res.status(204).end();
    })
    .catch(error => {
      next({
        message: 'We ran into an error removing the project',
      });
    });
});

module.exports = router;
