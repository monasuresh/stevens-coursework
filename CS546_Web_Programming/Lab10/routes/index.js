import authRoutes from './auth_routes.js';

const constructorMethod = (app) => {
    app.use('/', authRoutes);
    app.use('/register', authRoutes);
    app.use('/login', authRoutes);
    app.use('/protected', authRoutes);
    app.use('/admin', authRoutes);
    app.use('/logout', authRoutes);

    app.use('*', (req, res) => {
      return res.status(404).json({ error: 'Not found' });
    });
};

export default constructorMethod;
