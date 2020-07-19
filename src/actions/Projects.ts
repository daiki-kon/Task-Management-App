import { AxiosError } from 'axios';
import { ProjectInfo, CreateProject } from '../DefineInfo'

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
  
export const postProject = {
  start: (params: CreateProject,callBack: () => void) => ({
    type: ProjectActionType.POST_PROJECT_STASRT as typeof ProjectActionType.POST_PROJECT_STASRT,
    payload: {params, callBack}, 
  }),
  
  succeed: (params: CreateProject, result: CreateProject) => ({
    type: ProjectActionType.POST_PROJECT_SUCCEED as typeof ProjectActionType.POST_PROJECT_SUCCEED, 
    payload: { params, result },
  }),

  fail: (params: CreateProject, error: AxiosError) => ({
    type: ProjectActionType.POST_PROJECT_FAIL as typeof ProjectActionType.POST_PROJECT_FAIL, 
    payload: { params, error },
    error: true,
  }), 
}

export const projectDelete = (
  deleteProject: ProjectInfo
) => ({
  type: ProjectActionType.PROJECT_DELETE as typeof ProjectActionType.PROJECT_DELETE,
  payload: { deleteProject }
});



export type ProjectsAction =
  | ReturnType<typeof projectDelete>
  | ReturnType<typeof getProjecct.start>
  | ReturnType<typeof getProjecct.succeed>
  | ReturnType<typeof getProjecct.fail>
  | ReturnType<typeof postProject.start>
  | ReturnType<typeof postProject.succeed>
  | ReturnType<typeof postProject.fail>;


