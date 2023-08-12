const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
mongoose.connect(
        'mongodb+srv://root:1234@becker.99inx3k.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err)=>{ if(err)
            console.log(err)
        else console.log('mongo conected')})


const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/AdminRouter')

app.use('/user', express.json(), userRouter)

app.use('/admin',express.json(), adminRouter)


app.listen(PORT, ()=>{console.log('server Running')})