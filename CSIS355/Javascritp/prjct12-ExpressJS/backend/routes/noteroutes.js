const express = require('express');
const {getNotes,
    deleteNote,
    setNotes,
    updateNote} = require('../controller/noteController')

const router = express.Router();

router.get('/', getNotes);

router.post('/', setNotes);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

module.exports = router;