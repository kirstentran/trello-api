/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
//Khi export default ApiError thì khi import vào file khác không cần dấu {}


const createNew = async (req, res, next) => {
  try {
    // console.log('REQ.Body:', req.body)
    // console.log('REQ.query:', req.query)
    // console.log('REQ.params:', req.params)
    // console.log('REQ.files:', req.files)
    // console.log('REQ.cookies:', req.cookies)
    // console.log('REQ.jwtDecoded:', req.jwtDecoded)

    //Co ket qua tra ve phia client

    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API create new board' })
  } catch (error) {next(error)}
}

export const boardController = {
  createNew
}