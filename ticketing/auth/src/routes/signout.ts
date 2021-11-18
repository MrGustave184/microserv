import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.send('api v1 signout');
});

export { router as signoutRouter };