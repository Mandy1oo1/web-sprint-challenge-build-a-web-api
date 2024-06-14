const router = require('express').Router();
const Action = require('./actions-model');
const md = require('./actions-middleware');

router.get('/', async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (error) {
    next({ message: 'Error getting the list of actions' });
  }
});

router.get('/:id', md.checkActionId, async (req, res) => {
  res.json(req.action)
});

router.post('/', md.checkActionCreatePayload, async (req, res, next) => {
  try {
    const inserted = await Action.insert(req.body);
    res.status(201).json(inserted);
  } catch (error) {
    next({ message: 'Error creating the action' });
  }
});

router.put('/:id', md.checkActionUpdatePayload, md.checkActionId, async (req, res, next) => {
  try {
    const updated = await Action.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next({ message: 'We ran into an error updating the project' });
  }
});

router.delete('/:id', md.checkActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next({ message: 'We ran into an error removing the project' });
  }
});

module.exports = router;
