import gameRoutes from './games.js';
// import userRoutes from './users.js';

const constructorMethod = (app) => {
    app.use('/games', gameRoutes);
    // app.use('/users', userRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'This endpoint does not exist!'});
    });
};

export default constructorMethod;