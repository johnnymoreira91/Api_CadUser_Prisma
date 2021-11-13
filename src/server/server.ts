import express from 'express';
import cors from 'cors'
import userRoute from '../routes/userRoute'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRoute)

app.get('*', function (req, res) {
  res.status(404).send('what???')
});

export default app;