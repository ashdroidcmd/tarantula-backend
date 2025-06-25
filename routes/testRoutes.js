// Imports
import authMiddleware from '../middleware/authMiddleware.js';
import express from 'express'
import controller from '../controllers/testControllers.js';

// express.Router() - is a mini Express app you can use to organize your routes in a modular way. 
const router = express.Router();

    router.post('/postData', authMiddleware, controller.createData);
    router.get('/fetchData', controller.getAllData);
    router.get('/fetchbyID/:id', controller.getDataById);
    router.put('/update/:id', authMiddleware, controller.updateData);
    router.get('/search', controller.searchByName);
    router.delete('/delete/:id', authMiddleware, controller.deleteData);

export default router