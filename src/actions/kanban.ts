import { KanbanInfo, CreateKanban, GetKanbans, DeleteKanban } from  '../DefineInfo'
import { AxiosError } from 'axios';
import * as KanbanActionType from './kanbanConstants';

export const KANBAN_CREATE = 'KANBAN_CREATE';
export const KANBAN_DELETE = 'KANBAN_DELETE';
export const KANBAN_DELETE_ALL = 'KANBAN_DELETE_ALL';
export const KANBAN_EDIT_TITLE = 'KANBAN_EDIT_TITLE';
export const KANBAN_EDIT_CONTENT = 'KANBAN_EDIT_CONTENT';

export const postKanban = {
  start: (params: CreateKanban) => ({
    type: KanbanActionType.POST_KANBAN_START as typeof KanbanActionType.POST_KANBAN_START,
    payload: {params}, 
  }),
  
  succeed: (params: KanbanInfo, result: KanbanInfo) => ({
    type: KanbanActionType.POST_KANBAN_SUCCEED as typeof KanbanActionType.POST_KANBAN_SUCCEED, 
    payload: { params, result },
  }),

  fail: (error: AxiosError) => ({
    type: KanbanActionType.POST_KANBAN_FAIL as typeof KanbanActionType.POST_KANBAN_FAIL, 
    payload: { error },
    error: true,
  }), 
}

export const getKanbans = {
  start: (params: GetKanbans) => ({
    type: KanbanActionType.GET_KANBAN_START as typeof KanbanActionType.GET_KANBAN_START,
    payload: { params }, 
  }),
  
  succeed: (result: KanbanInfo[]) => ({
    type: KanbanActionType.GET_KANBAN_SUCCEED as typeof KanbanActionType.GET_KANBAN_SUCCEED, 
    payload: { result },
  }),

  fail: (error: AxiosError) => ({
    type: KanbanActionType.GET_KANBAN_FAIL as typeof KanbanActionType.GET_KANBAN_FAIL, 
    payload: { error },
    error: true,
  }), 
};

export const deleteKanban = {
  start: (params: DeleteKanban) => ({
    type: KanbanActionType.DELETE_KANBAN_START as typeof KanbanActionType.DELETE_KANBAN_START,
    payload: { params }, 
  }),
  
  succeed: (result: string[]) => ({
    type: KanbanActionType.DELETE_KANBAN_SUCCEED as typeof KanbanActionType.DELETE_KANBAN_SUCCEED, 
    payload: { result },
  }),

  fail: (error: AxiosError) => ({
    type: KanbanActionType.DELETE_KANBAN_FAIL as typeof KanbanActionType.DELETE_KANBAN_FAIL, 
    payload: { error },
    error: true,
  }), 
};

export const kanbanDeleteAll = (
  parentProjectID: string
) =>({
  type: KANBAN_DELETE_ALL as typeof KANBAN_DELETE_ALL,
  payload: { parentProjectID }
})

export const postTaskCard = {
  start: (params: CreateKanban) => ({
    type: KanbanActionType.POST_KANBAN_START as typeof KanbanActionType.POST_KANBAN_START,
    payload: { params }, 
  }),
  
  succeed: (result: KanbanInfo) => ({
    type: KanbanActionType.POST_KANBAN_SUCCEED as typeof KanbanActionType.POST_KANBAN_SUCCEED, 
    payload: { result },
  }),

  fail: (error: AxiosError) => ({
    type: KanbanActionType.POST_KANBAN_FAIL as typeof KanbanActionType.POST_KANBAN_FAIL, 
    payload: { error },
    error: true,
  }), 
}

export type KanbanAction =
| ReturnType<typeof kanbanDeleteAll>
| ReturnType<typeof postKanban.start>
| ReturnType<typeof postKanban.succeed>
| ReturnType<typeof postKanban.fail>
| ReturnType<typeof getKanbans.start>
| ReturnType<typeof getKanbans.succeed>
| ReturnType<typeof getKanbans.fail>
| ReturnType<typeof deleteKanban.start>
| ReturnType<typeof deleteKanban.succeed>
| ReturnType<typeof deleteKanban.fail>;