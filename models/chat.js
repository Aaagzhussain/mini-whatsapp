const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({ //schema
    from : {  // corrected from 'form' to 'from'
        type: String,
        required: true // constraints means it should be compulsory 
    }, 
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    }, 
    created_at: {
        type: Date,
        required: true
    },
})

const Chat = mongoose.model("Chat", chatSchema); 
module.exports = Chat;
