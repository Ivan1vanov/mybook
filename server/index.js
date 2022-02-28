import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import postRouter from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'
import conversationRouter from './routes/conversationROutes.js'
import messageRouter from './routes/messageRoutes.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '70mb', extended: true}))

//routes
app.get('/', (req, res) => {
    res.send('hello server')
})
app.use('/api/posts/', postRouter)
app.use('/api/users/', userRouter)
app.use('/api/conversations/', conversationRouter)
app.use('/api/messages/', messageRouter)

//connection
const PORT = process.env.PORT || 5000 
// const URL = 'mongodb+srv://userbook:userbook@cluster0.5glkz.mongodb.net/ivansbook?retryWrites=true&w=majority'

mongoose.connect(process.env.URL_CONNECTION, { useNewUrlParser: true }).then(() => {
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))
}).catch((e) => console.log(e))
