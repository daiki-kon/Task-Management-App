import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProject } from '../../actions/Projects';
import { ProjectInfo } from '../../DefineInfo';
import useReactRouter from 'use-react-router';
import { storeData } from '../../reducer';

import { Button, Form} from 'semantic-ui-react';
import './NewProjectForm.css';

const counterSelector = (state:ProjectInfo) => ( {...state} );

export const NewProjectForm: FC = () => {

  const dispatch = useDispatch();
  const { history, location, match } = useReactRouter();
  const user = useSelector((state:storeData) => state.user);

  const [title, setTitle] = useState('');
  const [desc,setDesc] = useState('')


  const submit = (event: any) => {
    // dispatch(projectCreate({projectID:"", projectTitle:titleP, projectDesc:descP}));
    // form submission canceled because the form is not connected の回避
    event.preventDefault();
    const newProject: ProjectInfo = {
      projectID: "",
      projectTitle: title,
      projectDesc: desc
    } 
    dispatch(
      postProject.start(
        {userName: user.userName, item: newProject},
        () => {history.push('/ProjectList')}
      )
    );
  }
  
  return (
    <div className='project-form'>
      <Form>
        <Form.Field>
          <label>Project Title</label>
          <input type="text" placeholder="ProjectTitle" onChange={(e) => setTitle(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Form.TextArea type='text' label='Project Description' placeholder='Please Describe This Project...' onChange={(e) => setDesc(e.currentTarget.value)} />
        </Form.Field>
        <Button type='submit' fluid onClick={(event) => submit(event)}>Create</Button>
      </Form>
    </div>
  );
};
