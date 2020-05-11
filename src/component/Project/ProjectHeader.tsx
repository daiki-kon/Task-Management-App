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
import { CertInfo } from '../Auth/Cert'

import { Button, Form } from 'semantic-ui-react';
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
      <CertInfo/>
      <Form className = 'NewKanban' onSubmit={() => submit(title)}>
        <Form.Field>
          <input type="text" placeholder='New Kanban' value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Field>
        <Form.Button content='Add New'/>
      </Form>
    </div>
  )
}

export default ProjectHeader;