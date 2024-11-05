import express from 'express';
import { registerAuthor, registerAdmin, registerReviewer, loginAdmin, loginAuthor, loginReviewer } from '../controllers/authController.js';

const authRoutes = express.Router();

/* REGISTER */
authRoutes.post('/registerAuthor', registerAuthor);
authRoutes.post('/registerReviewer', registerReviewer);
authRoutes.post('/registerAdmin', registerAdmin);

/* LOGIN */
authRoutes.post('/loginAuthor', loginAuthor);
authRoutes.post('/loginAdmin', loginAdmin);
authRoutes.post('/loginReviewer', loginReviewer);

authRoutes.get('/test', (req, res) => {
    res.send('Server is running');
});

export default authRoutes;
