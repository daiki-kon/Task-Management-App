import axios from 'axios';
import { apiBaseUrl } from '../../awsConfiguration';
import { KanbanInfo, CreateKanban, GetKanbans, DeleteKanban, TaskCardInfo, CreateTasKCard, UpdateTaskCard } from '../../DefineInfo'; 
import { getIdToken } from '../../container/Auth'

export const postKanbanFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const postKanban = async (kanban: CreateKanban) => {

    const newKanbanHash :{[key: string]: string;} = {
      "parentProjectID": kanban.item.parentProjectID,
      "userName": kanban.userName,
      "kanbanTitle": kanban.item.kanbanTitle
    }

    const idToken =  getIdToken();

    const response = await instance.post(`/task_mng/kanban`,JSON.stringify(newKanbanHash),
                                          {headers: {"Authorization": `${idToken}`}});
    
    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: KanbanInfo = response.data;

    return responseData;

  };
  return postKanban;
}

export const getKanbansFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const getKanbans = async (kanban: GetKanbans) => {

    const idToken =  getIdToken();

    const response = await instance.get(`/task_mng/kanban?userName=${kanban.userName}&parentProjectID=${kanban.parentProjectID}`,
                                          {headers: {"Authorization": `${idToken}`}});
    
    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: KanbanInfo[] = response.data;

    return responseData;

  };
  return getKanbans;
}

export const deleteKanbanFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const deleteKanban = async (kanban: DeleteKanban) => {

    const idToken =  getIdToken();

    const response = await instance.delete(`/task_mng/kanban`,
                                          {headers: {"Authorization": `${idToken}`}, data: kanban});
    
    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: string[] = response.data.deletedItems;

    return responseData;

  };
  return deleteKanban;
}

export const postTaskCardFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const postTaskCard = async (taskCard: CreateTasKCard) => {

    const idToken =  getIdToken();

    const response = await instance.post(`/task_mng/task`,JSON.stringify(taskCard),
                                          {headers: {"Authorization": `${idToken}`}});
    
    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: TaskCardInfo = response.data;

    return responseData;

  };
  return postTaskCard;
}

export const putTaskCardFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const putTaskCard = async (taskCard: UpdateTaskCard) => {

    const idToken =  getIdToken();

    const response = await instance.put(`/task_mng/task`,JSON.stringify(taskCard),
                                          {headers: {"Authorization": `${idToken}`}});
    
    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: TaskCardInfo = response.data;

    return responseData;

  };
  return putTaskCard;
}