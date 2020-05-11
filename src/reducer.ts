import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { v4 as UUID} from 'uuid';

import { ProjectsAction, PROJECT_CREATE, PROJECT_DELETE } from './actions/Projects'
import { KanbanAction, KANBAN_CREATE, KANBAN_DELETE, KANBAN_EDIT_TITLE, KANBAN_EDIT_CONTENT, KANBAN_DELETE_ALL } from './actions/kanban'
import { TascCardAction, TASK_CARD_ADD, TASK_CARD_DELETE_ALL,TASK_CARD_EDIT } from './actions/TaskCard'
import { Projects, ProjectInfo, Kanbans, KanbanInfo, TascCards, TaskCardInfo } from './DefineInfo'

const projectReducer: Reducer<Projects, ProjectsAction> = (
  state: Projects = { items: []},
  action: ProjectsAction,
): Projects => {
  switch (action.type) {
    case PROJECT_CREATE:

      const newState: ProjectInfo ={
        projectID: UUID().toString(),
        projectTitle: action.payload.projects.projectTitle,
        projectDesc: action.payload.projects.projectDesc,
      }

      return {
        ...state,
        items: [ ...state.items , newState]
      };

    case PROJECT_DELETE:
      return {
        ...state,
        items: state.items.filter((project: ProjectInfo) => project.projectID !== action.payload.deleteProject.projectID),
      };
  
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

const kanbanReducer: Reducer<Kanbans, KanbanAction> = (
  state: Kanbans = { items: []},
  action: KanbanAction,
): Kanbans => {
  switch (action.type) {
    case KANBAN_CREATE:

      const newState: KanbanInfo = {
        parentProjectID: action.payload.kanban.parentProjectID,
        kanbanID: UUID().toString(),
        kanbanTitle: action.payload.kanban.kanbanTitle,
      }

      return {
        ...state,
        items: [ ...state.items, newState]
      };

    case KANBAN_DELETE:
      return {
        ...state,
        items: state.items.filter((kanban: KanbanInfo) => kanban.kanbanID !== action.payload.kanbanDelete.kanbanID),
      };

    case KANBAN_DELETE_ALL:
      return{
        ...state,
        items: state.items.filter((kanban: KanbanInfo) => kanban.parentProjectID !== action.payload.parentProjectID)
      }

    case KANBAN_EDIT_TITLE:
      return {
        ...state,
        items: [ ]
      };

    case KANBAN_EDIT_CONTENT:
      return {
        ...state,
        items: []
      };
  
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

const taskCardReducer: Reducer<TascCards, TascCardAction> = (
  state: TascCards = { items: []},
  action: TascCardAction,
): TascCards => {
  switch (action.type) {
    case TASK_CARD_ADD:

      const newState: TaskCardInfo ={
        parentKanbanID: action.payload.task.parentKanbanID,
        taskCardID: UUID().toString(),
        content: action.payload.task.content        
      }

      return {
        ...state,
        items: [ ...state.items, newState]
      };
  
    case TASK_CARD_DELETE_ALL:
      return{
        ...state,
        items: state.items.filter((task: TaskCardInfo) => task.parentKanbanID !== action.payload.parentKanbanID)
      }

    case TASK_CARD_EDIT:
      const changeIndex: number =  state.items.findIndex((task:TaskCardInfo) => task.taskCardID === action.payload.task.taskCardID)
      return{
        ...state,
        items: [
          ...state.items.slice(0,changeIndex),
          action.payload.task,
          ...state.items.slice(changeIndex+1)
        ]
      }

    default: {
      return state;
    }
  }
};


const rootReducer = combineReducers({
  projects: projectReducer,
  kanbans: kanbanReducer,
  taskCards: taskCardReducer,
})

export interface storeData{
  projects: Projects;
  kanbans: Kanbans;
  taskCards: TascCards
}

export default rootReducer