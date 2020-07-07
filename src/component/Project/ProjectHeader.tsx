import React, { FC, useState, useRef} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { kanbanCreate } from '../../actions/kanban';

import { Button, Form, Input,Menu } from 'semantic-ui-react';
import './ProjectHeader.css';



const ProjectHeader : FC = () => {

  const dispatch = useDispatch();
  const { projectID } = useParams();
  const submit = (kanbanTitle: string) => {
    dispatch(kanbanCreate({kanbanTitle: kanbanTitle,parentProjectID: projectID}));
    setTitle('')
  }

  const [title, setTitle] = useState('');

  return(
    <div>
      <Menu className='project-menu' fluid>
        <Menu.Item>
          <Input type="text" placeholder='New Kanban' value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button content='Add' onClick={() => submit(title)}/>
        </Menu.Item>
      </Menu>
    </div>
    
  )
}

export default ProjectHeader;