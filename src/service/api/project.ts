import axios from 'axios';
import { apiBaseUrl } from '../../awsConfiguration';
import { ProjectInfo, CreateProject, DeleteProject } from '../../DefineInfo'; 
import { NewProjectForm } from '../../component/ProjectList/NewProjectForm';

export const getProjectsFactory  = () => {
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

    const projects: ProjectInfo[] = response.data;
    return projects;

  };
  return getProjects;
}

export const postProjectFactory = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const postProjects = async (project: CreateProject) => {

    interface responseData{
      userName: string;
      projectID: string;
      projectTitle: string;
      projectDesc: string;
    };

    const newProjectHash :{[key: string]: string;} = {
      "project_id": project.item.projectID,
      "user_name": project.userName,
      "project_title": project.item.projectTitle,
      "project_desc": project.item.projectDesc
    }

    const response = await instance.post(`/task_mng/project`,JSON.stringify(newProjectHash));

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const responseData: responseData = response.data;

    const newProject: CreateProject = {
      userName: responseData.userName,
      item: {
        projectID: responseData.projectID,
        projectTitle: responseData.projectTitle,
        projectDesc: responseData.projectDesc
      }
    }

    return newProject;

  };
  return postProjects;
}

export const deleteProjectsFactory  = () => {
  const config = {
    baseURL: apiBaseUrl,
    timeout: 7000,
  }
  const instance = axios.create(config);

  const deleteProject= async (deleteProject: DeleteProject) => {

    const deleteProjectHash :{[key: string]: string;} = {
      "projectID": deleteProject.projectID,
      "userName": deleteProject.userName
    };

    const response = await instance.delete(`/task_mng/project` , { data: deleteProjectHash});

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const deletedProject: DeleteProject = response.data;

    return deletedProject;

  };
  return deleteProject;
}