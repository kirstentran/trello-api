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

const getDetails = async (req, res, next) => {
  try {
    //console.log('req.params:', req.params)
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {next(error)}
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {next(error)}
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {next(error)}
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}