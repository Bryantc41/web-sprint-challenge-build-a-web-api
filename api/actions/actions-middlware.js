// add middlewares here related to actions

function validateAction() {
    return (req, res, next) => {
      const { project_id, description, notes, completed } = req.body;
      
      if (!project_id || typeof project_id !== 'number') {
        return next({
          status: 400,
          message: 'Project ID is required and must be a number'
        });
      }
      
      if (!description || typeof description !== 'string' || description.trim() === '') {
        return next({
          status: 400,
          message: 'Description is required and must be a non-empty string'
        });
      }
      
      if (!notes || typeof notes !== 'string' || notes.trim() === '') {
        return next({
          status: 400,
          message: 'Notes is required and must be a non-empty string'
        });
      }
      
      if (typeof completed !== 'boolean') {
        return next({
          status: 400,
          message: 'Completed must be a boolean value'
        });
      }
      
      next();
    };
  }
  
  module.exports = validateAction;