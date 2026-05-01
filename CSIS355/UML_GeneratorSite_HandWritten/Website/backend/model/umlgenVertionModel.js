const mongoose = require('mongoose');

const vertionSchema = mongoose.Schema(
    {
        vertion:{
            type: String,
            required: true,
        },
        stable:{
            type: Boolean,
            required:true,
        },
        os:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        depricated:{
            type: Boolean,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        }
    }
);

module.exports = mongoose.model('Vertion', vertionSchema, 'Vertions');