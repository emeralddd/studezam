require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongo = require('mongoose');

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const publicRouter = require('./routes/public');
const teacherRouter = require('./routes/teacher');
const userRouter = require('./routes/user');

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
    try {
        mongo.set("strictQuery", false);
        mongo.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbConnection}/${process.env.dbName}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(_ => console.log('DB Connected Successfully!'));
    } catch (err) {
        if (err) {
            console.log(err.message);
            process.exit(1);
        }
    }
}

connectDB();

//app.use(cors())
app.use(express.json())

app.get('/api', function (req, res) {
    res.send('hello world');
})

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/public', publicRouter)

if (process.env.NODE_ENV === 'production') {
    console.log('WARNING: IN PRODUCTION');
    app.use(express.static(path.join(__dirname, './frontend')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./frontend/index.html"))
    });
}

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
})
