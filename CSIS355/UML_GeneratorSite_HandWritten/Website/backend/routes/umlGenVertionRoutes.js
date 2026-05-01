const express = require('express');

const router = express.Router();

const {
    getVertions,
    createVertion,
    updateVertion,
    deleteVertion
} = require('../controller/vertionController');

const {protect} = require('../middleware/authMiddleware');

router.get('/', getVertions);
router.post('/', protect, createVertion);
router.put('/:id', protect, updateVertion);
router.delete('/:id', protect, deleteVertion);

module.exports = router;