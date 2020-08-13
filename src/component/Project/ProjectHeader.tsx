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
import { postKanban } from '../../actions/kanban';
import { storeData } from '../../reducer'
import { CreateKanban } from '../../DefineInfo' 
import { Button, Form, Input,Menu } from 'semantic-ui-react';
import './ProjectHeader.css';



const ProjectHeader : FC = () => {

  const dispatch = useDispatch();
  const user = useSelector((state:storeData) => state.user);
  const { projectID } = useParams();
  const submit = (kanbanTitle: string) => {

    const newKanban: CreateKanban ={
      userName: user.userName,
      item: {
        parentProjectID: projectID,
        kanbanID: '',
        kanbanTitle: kanbanTitle,
        taskCards:[]
      }
    }
    dispatch(postKanban.start(newKanban));
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