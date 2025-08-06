const express = require('express');
const helmet = require('helmet');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');  

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 9000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
