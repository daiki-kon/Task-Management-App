import { TaskCardInfo } from  '../DefineInfo'
export const TASK_CARD_ADD = 'TASK_CARD_ADD';
export const TASK_CARD_DELETE_ALL = 'TASK_CARD_DELETE_ALL';
export const TASK_CARD_EDIT = 'TASK_CARD_EDIT';

export const taskCardAdd = (
  task: TaskCardInfo
) =>({
  type: TASK_CARD_ADD as typeof TASK_CARD_ADD,
  payload: { task }
})

export const taskCardDeleteAll = (
  parentKanbanID: string
) => ({
  type: TASK_CARD_DELETE_ALL as typeof TASK_CARD_DELETE_ALL,
  payload: { parentKanbanID }
})

export const taskCardEdit = (
  task: TaskCardInfo
) => ({
  type: TASK_CARD_EDIT as typeof TASK_CARD_EDIT,
  payload: { task }
})

export type TascCardAction = 
  ReturnType<typeof taskCardAdd>
| ReturnType<typeof taskCardDeleteAll>
| ReturnType<typeof taskCardEdit>;