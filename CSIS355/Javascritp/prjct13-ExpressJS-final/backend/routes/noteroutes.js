const express = require('express');
const {getNotes,
    deleteNote,
    setNotes,
    updateNote} = require('../controller/noteController')

const router = express.Router();

const { protect } = require('../Middleware/authMiddleware')

router.get('/',protect, getNotes);

router.post('/',protect, setNotes);

router.put('/:id',protect, updateNote);

router.delete('/:id',protect, deleteNote);

module.exports = router;