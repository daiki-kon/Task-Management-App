import axios from 'axios';
import { apiBaseUrl } from '../../awsConfiguration';
import { ProjectInfo } from '../../DefineInfo'; 

export const getProjectsFactory = (userName?: string) => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const getProjects = async (userName: string) => {
    const response = await instance.get(`/task_mng/project?userName=${userName}`);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }
    console.log(response);
    console.log(response.data);

    const projects: ProjectInfo[] = response.data;
    return projects;

  };
  return getProjects;
}