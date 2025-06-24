const express = require('express');
const router = express.Router();
const controller = require('../controllers/testControllers');

router.post('/postData', controller.createData);
router.get('/fetchData', controller.getAllData);
router.get('/fetchbyID/:id', controller.getDataById);
router.put('/update/:id', controller.updateData);
router.get('/search', controller.searchByName);
router.delete('/delete/:id', controller.deleteData);

module.exports = router;