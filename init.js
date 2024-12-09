const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().  // establish connection with mongoose
then(() => { 
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
        to:"preeti",
        msg: "hii,",
        created_at: new Date(),
    },
    {
        from: "suresh",
        to:"harbhajan",
        msg: "cricket",
        created_at: new Date(),
    },
    {
        from: "virat",
        to:"anushka",
        msg: "love",
        created_at: new Date(),
    },
    {
        from: "me",
        to:"you",
        msg: "hellow",
        created_at: new Date(),
    },
    {
        from: "neha",
        to:"nena",
        msg: "great",
        created_at: new Date(),
    },
    {
        from: "meena",
        to:"shivani",
        msg: "good luck",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);