/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
//Khi export default ApiError thì khi import vào file khác không cần dấu {}
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    //Dieu huong du lieu sang tang service
    const createdBoard = await boardService.createNew(req.body)

    //Co ket qua tra ve phia client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {next(error)}
}

export const boardController = {
  createNew
}