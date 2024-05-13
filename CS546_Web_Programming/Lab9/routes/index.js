//Here you will require route files and export them as used in previous labs.
import palindromeCheckRoutes from './palindromeCheck.js';

const constructorMethod = (app) => {
  app.use('/', palindromeCheckRoutes);

  app.use('*', (req, res) => {
    return res.status(404).json({ error: 'Not found' });
  });
};

export default constructorMethod;
