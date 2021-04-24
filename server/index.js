require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mearn-learn-shard-00-00.iwls2.mongodb.net:27017,mearn-learn-shard-00-01.iwls2.mongodb.net:27017,mearn-learn-shard-00-02.iwls2.mongodb.net:27017/mearn-learn?ssl=true&replicaSet=atlas-q44bi7-shard-0&authSource=admin&retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })

        console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connect fail')
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

