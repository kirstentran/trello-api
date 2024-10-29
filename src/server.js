/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER =() => {
  const app = express()

  //Xu ly cors
  app.use(cors(corsOptions))

  //Enable req.body json data
  app.use(express.json())

  //Use APIs V1
  app.use('/v1', APIs_V1)

  //Middle ware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    //Môi trg production, chạy trên Render.com
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Production: Hello ${env.AUTHOR}, Backend-server is running at port:${ process.env.PORT}`)
    })
  }
  else {
    //Môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`3. Local Dev: Hello ${env.AUTHOR}, Backend-server is running at Host: ${env.LOCAL_DEV_APP_HOST} and port:${ env.LOCAL_DEV_APP_PORT}`)
    })
  }


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

