const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); // Import the Chat model
const methodOverride = require("method-override");

// Setting up views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // this line is written to connect static file like css, js etc
app.use(express.urlencoded({extended: true})); // this line is written to pass the data, it is used for create route post request
app.use(methodOverride("_method")); // this line is written for method override purpose


// Establishing connection with mongoose
main()
  .then(() => { 
    console.log("Connection to MongoDB successful");
  })
  .catch(err => console.log(err));

// Async function to connect to MongoDB
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


//Index Route

// app.get("/chats", async (req, res) => {
//   let chats = await Chat.find();
//   console.log(chats);
//   // res.send("working");
//   res.render("index.ejs", { chats });
// })

app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();  // Wait for the promise to resolve
    // console.log(chats);             // Log the chats to the terminal
    // res.send("working");            // You can modify this to send data or render a view
    res.render("index.ejs", { chats });
  } catch (error) {
    console.error("Error fetching chats:", error);  // Handle errors
    res.status(500).send("Error fetching chats");
  }
});


//New Route
app.get("/chats/new", (req,res) => {
  res.render("new.ejs");
})

// Create Route
app.post("/chats", (req, res) => {
  let {from , to, msg} = req.body;
  let newChat = new Chat ({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });
  // console.log(newChat);
  newChat
  .save()
  .then((res) => {
    console.log("chat was saved")
  })
  .catch((err) => {
    console.log(err);
  });
  res.redirect("/chats");
})

//Edit route
app.get("/chats/:id/edit", async(req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
  console.log(updatedChat);
  res.redirect("/chats");
});


//Delete Route
app.delete("/chats/:id", async(req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});


// // Setting up the root route
app.get("/", (req, res) => {
    res.send("Root is working");
});



// Starting the server on port 8080
app.listen(3000, () => {
    console.log("server is listening on port 3000");
});

