/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async(reqBody) => {
  try {
    //Xu ly logic du lieu tuy dac thu cua du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //Goi toi tang Model de xu ly luu ban ghi newBoard vao trong database
    const createdBoard = await boardModel.createNew(newBoard)

    //lay ban ghi board sau khi goi (tuy muc dich du an ma co can buoc nay hay khong)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //Ban notification ve cho admin khi co 1 cai board vua dc tao len
    //Phai co return de tra ket qua ve trong service
    return getNewBoard
  } catch (error) { throw error}
}

export const boardService = {
  createNew
}