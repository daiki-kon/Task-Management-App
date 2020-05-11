import UUID from 'uuid';

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
  projectID?: string;
  projectTitle: string;
  projectDesc: string;
}

export interface Projects{
  items: ProjectInfo[];  
}

export interface Kanbans{
  items: KanbanInfo[];
}

export interface TascCards{
  items: TaskCardInfo[];
}

export interface User{
  userID?  : string;
  userName?: string;
  isSignIn : boolean;
}