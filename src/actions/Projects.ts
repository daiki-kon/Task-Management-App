import { AxiosError } from 'axios';
import { ProjectInfo, KanbanInfo } from '../DefineInfo'

import * as ProjectActionType from './ProjectConstants';

interface GetProjectParams{
  userName: string;
}

interface GetProjectResult {
  projects: ProjectInfo[];
}

export const getProjecct = {
  start: (params: GetProjectParams) => ({
    type: ProjectActionType.GET_PROJECT_START as typeof ProjectActionType.GET_PROJECT_START,
    payload: params, 
  }),
  
  succeed: (params: GetProjectParams, result: GetProjectResult) => ({
    type: ProjectActionType.GET_PROJECT_SUCCEED as typeof ProjectActionType.GET_PROJECT_SUCCEED, 
    payload: { params, result },
  }),

  fail: (params: GetProjectParams, error: AxiosError) => ({
    type: ProjectActionType.GET_PROJECT_FAIL as typeof ProjectActionType.GET_PROJECT_FAIL, 
    payload: { params, error },
    error: true,
  }), 
};
  

export const projectCreate = (
  projects: ProjectInfo,
) => {
  return({
  type: ProjectActionType.PROJECT_CREATE as typeof ProjectActionType.PROJECT_CREATE,
  payload: { projects },
  }
)};

export const projectDelete = (
  deleteProject: ProjectInfo
) => ({
  type: ProjectActionType.PROJECT_DELETE as typeof ProjectActionType.PROJECT_DELETE,
  payload: { deleteProject }
});



export type ProjectsAction =
  | ReturnType<typeof projectCreate>
  | ReturnType<typeof projectDelete>
  | ReturnType<typeof getProjecct.start>
  | ReturnType<typeof getProjecct.succeed>
  | ReturnType<typeof getProjecct.fail>;


