// Write your "actions" router here!

const router = require('express').Router();
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const validateAction = require('./actions-middlware')


router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.json(actions);
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'Error retrieving actions',
        error: err.message || err
      });
    });
});

router.get('/:id', (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        next({
          status: 404,
          message: 'Action not found'
        });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'Error retrieving action',
        error: err.message || err
      });
    });
});

router.post('/', validateAction(), (req, res, next) => {
  Projects.get(req.body.project_id)
    .then(project => {
      if (!project) {
        return next({
          status: 400,
          message: 'Project does not exist'
        });
      }
      
      return Actions.insert(req.body);
    })
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(err => {
      next({
        status: 500,
        message: 'Error creating action',
        error: err.message || err
      });
    });
});

router.put('/:id', validateAction(), (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(updatedAction => {
      if (updatedAction) {
        res.json(updatedAction);
      } else {
        next({
         status: 404,
         message: 'Action not found'
        });
      }
    })
    .catch(err => {
      next({
        status: 500,
        message: 'Error updating action',
        error: err.message || err
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Actions.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        next({
          status: 404,
          message: 'Action not found'
        });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'Error deleting action',
        error: err.message || err
      });
    });
});

module.exports = router;