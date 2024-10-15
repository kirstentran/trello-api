/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'


const START_SERVER =() => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Backend-server is running at Host: ${env.APP_HOST} and port:${ env.APP_PORT}`)
  })

  //Thực hiên các tác vụ cleanup trước khi server backend dừng
  exitHook (() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB successfully!')
  })
}

//chỉ khi kết nối với Data BAse thành công thì start server Backend lên
//Immediately Invoked Function Expression (IIFE)(Annonymous async function)
(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('1. Connecting to MongoDB cloud Atlas...')
    await CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('2. Connected to MongoDB successfully!')

    //Khởi đôngj server backend sau khi connect data base thành công 
    START_SERVER()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(0)
  }
}) ()

// //chỉ khi kết nối với Data BAse thành công thì start server Backend lên
// console.log('1. Connecting to MongoDB cloud Atlas...')

// CONNECT_DB()
//   .then( () => console.log('2.Connected to MongoDB successfully!'))
//   .then( () => START_SERVER())
//   .catch(error => {
//     // eslint-disable-next-line no-console
//     console.error(error)
//     process.exit(0)
//   })

