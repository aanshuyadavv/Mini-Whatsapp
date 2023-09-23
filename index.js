const express = require('express')
const app = express()

const Chat = require("./models/chat")
var methodOverride = require('method-override')


const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.use(express.static(__dirname + '/public'));

const port = 8080;


const mongoose = require('mongoose');

main()
    .then(() => {
        console.log('connection succesful')
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/", (req, res) => {
    res.send('root')
})

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render('index.ejs', { chats })

})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/chats", (req, res) => {
    // res.send('post working')
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    })
    newChat.save()
        .then((res) => {
            console.log(res);
        }).catch(((err) => {
            console.log(err)
        }));

    res.redirect("/chats")
})

app.get("/chats/:id/edit", async (req, res) => {
    // res.send("edit")
    let { id } = req.params
    let find = await Chat.findById(id)
    // console.log(find)
    let oldMsg = find.msg;
    res.render("edit.ejs", { find, oldMsg })

})
app.put("/chats/:id", async (req, res) => {
    // console.log(newMsg)
    // console.log(id)
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true })
    console.log(updatedChat)
    res.redirect("/chats")

})

app.delete("/chats/:id", async (req,res)=>{
    let { id } = req.params;
   let del = await Chat.findByIdAndDelete(id)
   console.log(del)
    // res.send("delete")
    res.redirect("/chats")
})



app.listen(port, () => {
    console.log("listening")
})










// Chat.deleteMany({}).then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })
