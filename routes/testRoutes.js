import authMiddleware from '../middleware/authMiddleware.js';
import express from 'express'

const router = express.Router();

import controller from '../controllers/testControllers.js';

router.post('/postData', authMiddleware, controller.createData);
router.get('/fetchData', controller.getAllData);
router.get('/fetchbyID/:id', controller.getDataById);
router.put('/update/:id', authMiddleware, controller.updateData);
router.get('/search', controller.searchByName);
router.delete('/delete/:id', authMiddleware, controller.deleteData);

export default router