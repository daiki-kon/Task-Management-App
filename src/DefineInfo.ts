import { AxiosError } from 'axios';

export interface TaskCardInfo{
  parentKanbanID: string;
  taskCardID?: string;
  content: string;
}

export interface KanbanInfo{
  parentProjectID: string
  kanbanID? : string;
  kanbanTitle: string;
}

export interface ProjectInfo{
  projectID: string;
  projectTitle: string;
  projectDesc: string;
}

export interface CreateProject{
  userName: string;
  item: ProjectInfo;
}

export interface DeleteProject{
  userName: string;
  projectID: string;
}

export interface Projects{
  items: ProjectInfo[];  
  isLoading: boolean;
  error?: AxiosError | null;
}

export interface Kanbans{
  items: KanbanInfo[];
}

export interface TascCards{
  items: TaskCardInfo[];
}

export interface User{
  userName: string;
  isSignIn : boolean;
}