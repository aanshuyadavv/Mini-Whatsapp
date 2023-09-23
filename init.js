const mongoose = require('mongoose');
const Chat = require("./models/chat")


main()
    .then(() => {
        console.log('connection succesful')
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: 'bittu',
        to: "anshu",
        msg: "send me your exam sheet 1",
        created_at: new Date()
    },
    {
        from: 'anshu',
        to: "himanshi",
        msg: "send me your exam sheet 2",
        created_at: new Date()
    },
    {
        from: 'himanshi',
        to: "bittu",
        msg: "send me your exam sheet 3",
        created_at: new Date()
    }

]

Chat.insertMany(allChats)
