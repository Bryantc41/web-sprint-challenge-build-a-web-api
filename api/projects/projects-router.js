const router = require('express').Router();
const Projects = require('./projects-model');
const validateProject = require('./projects-middleware');

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.json(projects);
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'We ran into an error retrieving the projects',
        error: err.message || err
      });
    });
});

router.get('/:id', (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        next({
          status: 404,
          message: 'Project not found',
        });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'Error retrieving the project',
        error: err.message || err,
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Projects.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        next({
          status: 404,
          message: 'Project not found'
        });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: 'Error deleting the project',
        error: err.message || err
      });
    });
});

router.post('/', validateProject(), (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      next({
        status: 500,
        message: 'Error creating project',
        error: err.message || err
      });
    });
});

router.put('/:id', validateProject(), (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(updatedProject => {
      if (updatedProject) {
        res.json(updatedProject);
      } else {
        next({
          status: 404,
          message: 'Project not found'
        });
      }
    })
    .catch(err => {
      next({
        status: 500,
        message: 'Error updating project',
        error: err.message || err
      });
    });
});

router.get('/:id/actions', (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (!project) {
        return next({
          status: 404,
          message: 'Project not found'
        });
      }
      
      return Projects.getProjectActions(req.params.id);
    })
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      next({
        status: 500,
        message: 'Error retrieving project actions',
        error: err.message || err
      });
    });
});

module.exports = router;
