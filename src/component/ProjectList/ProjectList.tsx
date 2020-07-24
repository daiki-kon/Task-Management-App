import React,{ FC, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Icon, Menu, Dimmer,　Loader } from 'semantic-ui-react';
import { Projects, ProjectInfo, KanbanInfo } from '../../DefineInfo'; 
import { storeData } from '../../reducer'

import './ProjectList.css';
import { kanbanDeleteAll } from '../../actions/kanban';
import { getProjecct, deleteProject } from '../../actions/Projects'
import { taskCardDeleteAll } from '../../actions/TaskCard';


export const ProjectList: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const projects = useSelector((state:storeData) => state.projects);
  const user = useSelector((state:storeData) => state.user);

  useEffect(() => {
    dispatch(getProjecct.start({userName: user.userName}))
  },[user.userName]);
  


  return(
    <div>
      <Menu className='list-menu' fluid>
        <Menu.Item> 
          <Button onClick={() => history.push('/NewProject')} >New Project</Button>
        </Menu.Item>
      </Menu>
      <div className='project-list'>
        {projects.isLoading?
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>:
          <ManageProject {...projects}/>}
      </div>
    </div>
  )
}

const ManageProject: FC<Projects> = (
  projects
) =>{

  return(
    <>
      {projects.items.length ? (projects.items.map((output,index) => (<ProjectDesc key={index.toString()} {...output}/>))) : <ProjectDescEmpty/>}
    </>
  )
}

const ProjectDesc: FC<ProjectInfo> = (
  projectInfo
) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const kanbans = useSelector((state:storeData) => state.kanbans);
  const user    = useSelector((state:storeData) => state.user)

  const projectClose = (e: React.MouseEvent) => {
    
    // 親のイベントを発火させないように追加
    e.stopPropagation() 

    const deleteKanbans: KanbanInfo[] = kanbans.items.filter((kanban: KanbanInfo) => (kanban.parentProjectID === projectInfo.projectID))
    deleteKanbans.map((kanban: KanbanInfo) => (dispatch(taskCardDeleteAll(kanban.kanbanID || ''))))
    dispatch(kanbanDeleteAll(projectInfo.projectID || ''))
    dispatch(deleteProject.start({userName: user.userName, projectID: projectInfo.projectID}))
  }

  return(
    <div className='project-card'>
      <Card fluid onClick={() => history.push('/Project/' + projectInfo.projectID)}>
        <Card.Content className='project-header'>
          <header>{ projectInfo.projectTitle }</header>
          <Button className='project-delete' icon onClick={ (e: React.MouseEvent) => (projectClose(e))}>
            <Icon name='close'/>
          </Button>
        </Card.Content>
        <Card.Content description={ projectInfo.projectDesc } />
      </Card>
    </div>
    
  )
}

const ProjectDescEmpty: FC = () => {
  return(
    <Card className="project-none" fluid>
      <Card.Content>
          <Card.Header textAlign='center'>Project is None</Card.Header>
      </Card.Content>
    </Card>
  )
}