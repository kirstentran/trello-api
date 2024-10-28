/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'


const createNew = async(reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    //xu ly cau truc du lieu truoc khi tra ve
    if (getNewColumn) {
      getNewColumn.cards = []
      //Cap nhat lai mang columOrderIds trong collection  board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error}
}

const update = async(columnId, reqBody) => {
  try {
    //Goi toi tang Model de xu ly luu ban ghi newBoard vao trong database
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn
  } catch (error) { throw error}
}

export const columnService = {
  createNew,
  update
}