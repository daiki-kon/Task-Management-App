import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { v4 as UUID} from 'uuid';

import { UserAction, LOGIN_USER} from './actions/User'
import { ProjectsAction} from './actions/Projects'
import * as ProjectActionType from './actions/ProjectConstants'
import { KanbanAction, KANBAN_CREATE, KANBAN_DELETE, KANBAN_EDIT_TITLE, KANBAN_EDIT_CONTENT, KANBAN_DELETE_ALL } from './actions/kanban'
import { TascCardAction, TASK_CARD_ADD, TASK_CARD_DELETE_ALL,TASK_CARD_EDIT } from './actions/TaskCard'
import { User, Projects, ProjectInfo, Kanbans, KanbanInfo, TascCards, TaskCardInfo } from './DefineInfo'
import { UserAgent } from 'amazon-cognito-identity-js';

const projectReducer: Reducer<Projects, ProjectsAction> = (
  state: Projects = { 
    items: [],
    isLoading: false, 
  },
  action: ProjectsAction,
): Projects => {
  switch (action.type) {
    //Create Project 
    case ProjectActionType.POST_PROJECT_STASRT:
      return {
        ...state,
        items: [ ...state.items ],
        isLoading: true,
      };
    case ProjectActionType.POST_PROJECT_SUCCEED:
      return {
        ...state,
        items: [ ...state.items, action.payload.result.item],
        isLoading: false
        
      };
    case ProjectActionType.POST_PROJECT_FAIL:
      return {
        ...state,
        items: [ ...state.items],
        isLoading: false,
        error: action.payload.error
      };
    
    // Get Projec
    case ProjectActionType.GET_PROJECT_START:
      return {
        ...state,
        items: [ ...state.items ],
        isLoading: true
      };
    case ProjectActionType.GET_PROJECT_SUCCEED:
      return {
        ...state,
        items: action.payload.result.projects,
        isLoading: false
      };
    case ProjectActionType.GET_PROJECT_FAIL:
      return {
        ...state,
        items: [ ...state.items],
        isLoading: false,
        error: action.payload.error
      };

    case ProjectActionType.PROJECT_DELETE:
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
        items: []
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

const userReducer: Reducer<User, UserAction> = (
  state: User = {userName: '', isSignIn: true},
  action: UserAction,
): User => {
  switch(action.type) {
    case LOGIN_USER: 
      const registerUsername: string = action.payload.userInfo.userName;
      const registerSignIn: boolean = action.payload.userInfo.isSignIn;

      const modedUser: User = {
          userName: registerUsername,
          isSignIn: registerSignIn
      }

      return{
        ...state,
        ...modedUser
      }

    default: {
      return state;
    }
  }
}


const rootReducer = combineReducers({
  projects: projectReducer,
  kanbans: kanbanReducer,
  taskCards: taskCardReducer,
  user: userReducer
})

export interface storeData{
  projects: Projects;
  kanbans: Kanbans;
  taskCards: TascCards;
  user: User;
}

export default rootReducer
