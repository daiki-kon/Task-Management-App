import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { Grid } from 'semantic-ui-react';
import './Project.css'

import { Kanbans, KanbanInfo, ProjectInfo } from '../../DefineInfo'
import { getKanbans } from '../../actions/kanban'
import { Kanban, KanbanEmpty} from './Kanban';
import ProjectHeader from './ProjectHeader';
import { storeData } from '../../reducer'

const Project : FC = () => {
  const dispatch = useDispatch();

  const { projectID } = useParams();
  const kanbans = useSelector((state:storeData) => state.kanbans);
  const user = useSelector((state:storeData) => state.user);

  useEffect(() => {
    dispatch(getKanbans.start({userName: user.userName, parentProjectID: projectID}))
  },[projectID,user.userName]);

  const currentKanbans: KanbanInfo[]  = kanbans.items.filter((kanban) => kanban.parentProjectID === projectID)  

  return(
    <div　className='project'>
      <div className='project-header'>
        <ProjectHeader/>
      </div>
      <div className = "project-body">
        <Grid>
          {currentKanbans.length ? (currentKanbans.map((kanban) => (<Kanban key={kanban.kanbanID} { ...kanban }/>)))  :  <KanbanEmpty/>}
        </Grid>
      </div>
    </div>
  )
}

export default Project;