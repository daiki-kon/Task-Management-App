import React,{ FC, useEffect } from 'react';
import { withRouter } from 'react-router';
import useReactRouter from 'use-react-router';
import { useDispatch, useSelector } from "react-redux";
import { projectDelete} from '../../actions/Projects';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Projects, ProjectInfo, KanbanInfo } from '../../DefineInfo'; 
import { CertInfo } from '../Auth/Cert';
import { storeData } from '../../reducer'

import './ProjectList.css';
import { KANBAN_DELETE_ALL, kanbanDeleteAll } from '../../actions/kanban';
import { taskCardDeleteAll } from '../../actions/TaskCard';

const range = (n: number) => (n < 0 ? [] : Array.from(Array(n), (_, i) => i));

export const ProjectList: FC = () => {
  const { history, location, match } = useReactRouter();

  let projects = useSelector((state:storeData) => state.projects);

  return(
    <div>
      <div className = 'header'>
        <Button onClick={() => history.push('/NewProject')} >New Project</Button>
        <CertInfo/>
      </div>
      {projects.items.length ? (projects.items.map((output,index) => (<ProjectDesc key={index.toString()} { ...output}/>))) : <ProjectDescEmpty/>}
    </div>
  )
}

const ProjectDesc: FC<ProjectInfo> = (
  projectProps
) => {
  const dispatch = useDispatch();
  const { history, location, match } = useReactRouter();
  const kanbans = useSelector((state:storeData) => state.kanbans);

  const projectClose = () => {
  
    const deleteKanbans: KanbanInfo[] = kanbans.items.filter((kanban: KanbanInfo) => (kanban.parentProjectID === projectProps.projectID))
    deleteKanbans.map((kanban: KanbanInfo) => (dispatch(taskCardDeleteAll(kanban.kanbanID || ''))))
    dispatch(kanbanDeleteAll(projectProps.projectID || ''))
    dispatch(projectDelete( projectProps ))
  }

  return(
    <div className='project-desc'>
      <Card className="project-card" onClick={() => history.push('/Project/' + projectProps.projectID)}>
        <Card.Content header={ projectProps.projectTitle}  />
        <Card.Content description={ projectProps.projectDesc } />
      </Card>
      <div className='project-delete'>
          <Button icon onClick={ () => (projectClose())}>
            <Icon name='close'/>
          </Button>
      </div>
    </div>
    
  )
}

const ProjectDescEmpty: FC = () => {
  return(
    <Card className="project-none">
      <Card.Content>
          <Card.Header>Project is None</Card.Header>
      </Card.Content>
    </Card>
  )
}