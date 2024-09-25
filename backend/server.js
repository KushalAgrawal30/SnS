const app = require('./app')
const mongoose = require('mongoose')

const DB = "mongodb+srv://kushalagr04:vOa9Kvwn00if4pxB@cluster0.kjvic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB).then(() => console.log("Database Connected"));

app.listen(8000, () => {
    console.log('Server started at PORT:8000')
})