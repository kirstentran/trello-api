import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { pickUser } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // Kiểm tra xem email đã tồn tại trong hệ thống của chúng ta hay chưa
    const existUser = await userModel.findOneByEmail(reqBody.email)
    if (existUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
    }

    //Tạo data để lưu vào database
    //nameFromEmail là tên ng dùng lấy từ email vd kirstentran@gmail.com thì sẽ lấy đc kirstentran
    const nameFromEmail = reqBody.email.split('@')[0]
    const newUser = {
      email: reqBody.email,
      password: bcryptjs.hashSync(reqBody.password, 8), //giá trị thứ hai là độ phức tạp, gía trị càng cao thì băm càng lâu
      username: nameFromEmail,
      displayName: nameFromEmail, //mặc định để cho giống username khi user đky mới, về sau làm tính năng update cho user 
      verifyToken: uuidv4()
    }
    // Thực hiện lưu thông tin user vào databas
    const createdUser = await userModel.createNew(newUser)

    const getNewUser = await userModel.findOneById(createdUser.insertedId)
    //Gửi email cho ng dùng xác thực tài khoản

    //Return trả về dữ liệu cho phía controller
    return pickUser (getNewUser)
  }
  catch (error) { throw error }
}

export const userService = {
  createNew
}