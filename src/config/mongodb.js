/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

//Khởi tạo đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //Lưu ý: serverApi có từ phiên bản MongoBD 5.0.0 trở lên, có thể không cần dùng nó ,còn nếu mà dùng nó 
  // thì chúng ta phải chỉ định một cái Stable API versiom của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Kết nới tới database
export const CONNECT_DB = async () => {
  //gọi kết nối tơi MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  //Kết nối thành công thì lấy ra Database theo tên và gán ngược lại nó vào biến trelloDatabaseInstance
  //ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

//function GET_DB (k async) có nhiệm vụ export ra cái Trello Database Instance đã được kết nối
// thành công tới MongoDB dể chúng ta có thê sử dụng nó ở các file khác trong code
//Lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB này sau khi đã kết nối tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to database first')
  }
  return trelloDatabaseInstance
}


