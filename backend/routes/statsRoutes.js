const express = require('express');
const { getStats } = require('../controllers/statsController');
const router = express.Router();
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, isAdmin, getStats);

module.exports = router;