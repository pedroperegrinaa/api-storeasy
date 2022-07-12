import dotenv from 'dotenv/config'
import app from './app'

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running in port http://localhost:5000')
}
)
