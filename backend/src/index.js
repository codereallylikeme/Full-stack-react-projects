import dotenv from 'dotenv'
dotenv.config()
import {app} from './app.js'
import {initDatabase} from './db/init.js'
try {
  await initDatabase()
  const Port = process.env.PORT || 8080
  app.listen(Port) 
  console.info(`Hello, this express server is running on http://localhost:${Port}`)
} catch (err) {
  console.error('This is an error connecting to database:', err)
  
}



