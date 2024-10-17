/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'

const createNew = async(reqBody) => {
  try {
    //Xu ly logic du lieu tuy dac thu cua du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Ban notification ve cho admin khi co 1 cai board vua dc tao len
    //Phai co return de tra ket qua ve trong service
    return newBoard
  } catch (error) { throw error}
}

export const boardService = {
  createNew
}