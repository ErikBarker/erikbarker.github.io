const asyncHandler = require('express-async-handler');
const Note = require('../model/noteModel');

const getNotes = asyncHandler(async (req, res) =>{
    
    const notes = await Note.find({user: user.id})


    res.status(200).json(notes)
});

const setNotes = asyncHandler(async (req, res) =>{

    if (!req.body.text) {
        res.status(400)
        throw new Error("please add text field")
    }
    console.log(req.body.text)

    //create data in db
    const noteCreated = await Note.create(
        {
            text:req.body.text,
            user:req.user.id
        }
    )

    res.status(200).json(noteCreated)
}
);
const updateNote = asyncHandler(async (req,res)=>{
    const note = await Note.findById(req.params.id)//find the note

    if (!note){
        res.status(400)
        throw new Error("Note not found");
    }

    //update if found
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id, {text:req.body.text}, {new:true}
    )

    res.status(200).json(updatedNote)
});

const deleteNote = asyncHandler(async (req,res)=>{
    const note = await Note.findById(req.params.id)//find the note
    if(!note){
        res.status(400)
        throw new Error("Note not found");
    } 

    await note.deleteOne();

    res.status(200).json({message:`delete note ${req.params.id}`})
});

module.exports = {
    getNotes,
    deleteNote,
    setNotes,
    updateNote
}