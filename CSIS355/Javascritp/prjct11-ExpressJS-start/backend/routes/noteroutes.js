const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    res.status(200).json({message:"yay here is your notes"})
})

router.post('/', (req,res)=>{
    res.status(200).json({message:"set note"})
})

router.put('/:id', (req,res)=>{
    res.status(200).json({message:`update note ${req.params.id}`})
})

router.put('/:id', (req,res)=>{
    res.status(200).json({message:`delete note ${req.params.id}`})
})

module.exports = router;