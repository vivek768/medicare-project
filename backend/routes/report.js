const express = require('express');
const router = express.Router();

const controller = require('../controller/report_controller');
router.get('/', controller.getReports);
router.post('/create', controller.create);
router.post('/upload', controller.uploadFile);
router.get('/:name', controller.download);
router.delete('/:name', controller.delete);


module.exports = router;