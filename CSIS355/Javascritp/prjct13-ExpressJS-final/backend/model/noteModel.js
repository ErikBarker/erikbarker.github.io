//this will def the shpe of our data
//basially the bluprint of our schima

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        text:{
            type:String,
            required:[true, 'Please add text for note']
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Note', noteSchema)