import { AxiosError } from 'axios';
import { ProjectInfo, CreateProject, DeleteProject } from '../DefineInfo'

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

export const deleteProject = {
  start: (params: DeleteProject) => ({
    type: ProjectActionType.DELETE_PROJECT_START as typeof ProjectActionType.DELETE_PROJECT_START,
    payload: params, 
  }),
  
  succeed: (params: DeleteProject, result: DeleteProject) => ({
    type: ProjectActionType.DELETE_PROJECT_SUCCEED as typeof ProjectActionType.DELETE_PROJECT_SUCCEED, 
    payload: { params, result },
  }),

  fail: (params: DeleteProject, error: AxiosError) => ({
    type: ProjectActionType.DELETE_PROJECT_FAIL as typeof ProjectActionType.DELETE_PROJECT_FAIL, 
    payload: { params, error },
    error: true,
  }), 
}


export type ProjectsAction =
  | ReturnType<typeof getProjecct.start>
  | ReturnType<typeof getProjecct.succeed>
  | ReturnType<typeof getProjecct.fail>
  | ReturnType<typeof postProject.start>
  | ReturnType<typeof postProject.succeed>
  | ReturnType<typeof postProject.fail>
  | ReturnType<typeof deleteProject.start>
  | ReturnType<typeof deleteProject.succeed>
  | ReturnType<typeof deleteProject.fail>;



