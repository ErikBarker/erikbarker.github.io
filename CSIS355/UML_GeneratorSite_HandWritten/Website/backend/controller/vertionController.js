const asyncHandler = require('express-async-handler');
const Vertion = require('../model/umlgenVertionModel')

const getVertions = asyncHandler(async (req,res) =>{
    const vertions = await Vertion.find({});

    res.status(200).json(vertions);
});

const createVertion = asyncHandler(async (req,res) =>{
    if(!req.body.vertion || !req.body.os || req.body.price == null){
        res.status(400);
        throw new Error("please fill all fields");
    }
    
    //create vertion in db

    const vertionCreated = await Vertion.create(
        {
            vertion:req.body.vertion,
            stable:req.body.stable,
            os:req.body.os,
            description:req.body.description,
            depricated:req.body.depricated,
            price:req.body.price
        }
    )

    res.status(201).json(vertionCreated);
});

const updateVertion = asyncHandler(async (req,res) =>{
    const updvertion = await Vertion.findById(req.params.id);

    //check to see if the note was found
    if(!updvertion){
        res.status(400);
        throw new Error("note not found")
    }

    let changes = {}

    if (!(updvertion.vertion === req.body.vertion)) {
        changes.vertion = req.body.vertion
    }

    if (!(updvertion.stable === req.body.stable)) {
        changes.stable = req.body.stable
    }

    if (!(updvertion.os === req.body.os)) {
        changes.os = req.body.os
    }

    if (!(updvertion.description === req.body.description)) {
        changes.os = req.body.os
    }

    if (!(updvertion.depricated === req.body.depricated)) {
        changes.depricated = req.body.depricated
    }

    if (!(updvertion.price === req.body.price)) {
        changes.price = req.body.price
    }

    const updatedVertion = await Vertion.findByIdAndUpdate(
        req.params.id, changes, { returnDocument: 'after' }
    );

    res.status(200).json(updatedVertion);
});

const deleteVertion = asyncHandler(async (req,res) =>{
    const delVertion = await Vertion.findById(req.params.id)//find the note
    if(!delVertion){
        res.status(400)
        throw new Error("vertion not found");
    } 

    await delVertion.deleteOne();

    res.status(200).json({message:`deleted vertion ${req.params.id}`})
});


module.exports = {
    getVertions, createVertion, updateVertion, deleteVertion
}