import { AxiosError } from 'axios';

export interface TaskCardInfo{
  parentKanbanID: string;
  taskCardID?: string;
  content: string;
}

export interface CreateTasKCard{
  userName: string;
  parentProjectID: string;
  kanbanID: string;
  taskContent: string;
}

export interface UpdateTaskCard{
  userName: string;
  parentProjectID: string;
  kanbanID: string;
  taskID: string;
  taskContent: string;
}

export interface KanbanInfo{
  parentProjectID: string
  kanbanID : string;
  kanbanTitle: string;
  taskCards: TaskCardInfo[];
} 

export interface CreateKanban{
  userName: string;
  item: KanbanInfo;
}

export interface GetKanbans{
  userName: string;
  parentProjectID: string;
}

export interface DeleteKanban{
  userName: string;
  parentProjectID: string;
  deleteKanbanIDs: string[];
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
  isLoading: boolean
  error?: AxiosError | null;
}

export interface TascCards{
  items: TaskCardInfo[];
}

export interface User{
  userName: string;
  isSignIn : boolean;
}