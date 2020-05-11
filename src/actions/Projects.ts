import { ProjectInfo, KanbanInfo } from '../DefineInfo'

export const PROJECT_CREATE = 'PROJECT_CREATE';
export const PROJECT_DELETE = 'PROJECT_DELETE';

export const projectCreate = (
  projects: ProjectInfo,
) => {
  return({
  type: PROJECT_CREATE as typeof PROJECT_CREATE,
  payload: { projects },
  }
)};

export const projectDelete = (
  deleteProject: ProjectInfo
) => ({
  type: PROJECT_DELETE as typeof PROJECT_DELETE,
  payload: { deleteProject }
});



export type ProjectsAction =
  | ReturnType<typeof projectCreate>
  | ReturnType<typeof projectDelete>;
