// add middlewares here related to projects

  function validateProject() {
    return (req, res, next) => {
      const { name, description, completed } = req.body;
      
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return next({
          status: 400,
          message: 'Name is required and must be a non-empty string'
        });
      }
      
      if (!description || typeof description !== 'string' || description.trim() === '') {
        return next({
          status: 400,
          message: 'Description is required and must be a non-empty string'
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
  
  module.exports = validateProject;