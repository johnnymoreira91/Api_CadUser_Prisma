import express from 'express';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('*', function (req, res) {
  res.status(404).send('what???')
});

export default app;