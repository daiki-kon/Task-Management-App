import { KanbanInfo, TaskCardInfo } from  '../DefineInfo'

export const KANBAN_CREATE = 'KANBAN_CREATE';
export const KANBAN_DELETE = 'KANBAN_DELETE';
export const KANBAN_DELETE_ALL = 'KANBAN_DELETE_ALL';
export const KANBAN_EDIT_TITLE = 'KANBAN_EDIT_TITLE';
export const KANBAN_EDIT_CONTENT = 'KANBAN_EDIT_CONTENT';

export const TASK_CARD_ADD = 'TASK_CARD_ADD';

export const kanbanCreate = (
  kanban: KanbanInfo
) => ({
  type: KANBAN_CREATE as typeof KANBAN_CREATE,
  payload: { kanban }
})

export const kanbanDelete = (
  kanbanDelete: KanbanInfo
) => ({
  type: KANBAN_DELETE as typeof KANBAN_DELETE,
  payload: { kanbanDelete }
});

export const kanbanDeleteAll = (
  parentProjectID: string
) =>({
  type: KANBAN_DELETE_ALL as typeof KANBAN_DELETE_ALL,
  payload: { parentProjectID }
})

export const kanbanEditTitle = () => ({
  type: KANBAN_EDIT_TITLE as typeof KANBAN_EDIT_TITLE,
});

export const kanbanEditContent = () => ({
  type: KANBAN_EDIT_CONTENT as typeof KANBAN_EDIT_CONTENT,
});


export type KanbanAction =
| ReturnType<typeof kanbanCreate>
| ReturnType<typeof kanbanDelete>
| ReturnType<typeof kanbanEditTitle>
| ReturnType<typeof kanbanEditContent>
| ReturnType<typeof kanbanDeleteAll>;