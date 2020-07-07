import React, { FC } from 'react';
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
import { Kanban, KanbanEmpty} from './Kanban';
import ProjectHeader from './ProjectHeader';
import { storeData } from '../../reducer'

const range = (n: number) => (n < 0 ? [] : Array.from(Array(n), (_, i) => i));

const Project : FC = () => {
  
  const { projectID } = useParams();
  const kanbans = useSelector((state:storeData) => state.kanbans);

  const currentKanbans: KanbanInfo[]  = kanbans.items.filter((kanban) => kanban.parentProjectID === projectID)

  return(
    <div　className='project'>
      <div className='project-header'>
        <ProjectHeader/>
      </div>
      <div className = "project-body">
        <Grid>
          {currentKanbans.length ? (currentKanbans.map((kanban) => (<Kanban { ...kanban }/>)))  :  <KanbanEmpty/>}
        </Grid>
      </div>
    </div>
  )
}

export default Project;