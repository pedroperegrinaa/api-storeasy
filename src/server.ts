import dotenv from 'dotenv/config'
import app from './app'

app.listen(process.env.PORT || 5000)